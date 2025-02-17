import express, { query } from "express"
import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()
//root@127.0.0.1:3306
const db = await mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
if (db){
    console.log("Database connected !")
}else{console.log("Disconeted")}
router.post("/login",async(req,res)=>{
    const { username,password } = req.body
    if(!username && !password){
        res.send({msg:"no username provided"})

    }else{
       const query = "SELECT COUNT(*) as count FROM users WHERE _name = ? AND _password = ? "
       const [resp] = await db.query(query,[username,password])
       if(resp[0].count > 0){
           const payload = {
        username:username,
        exp: Math.floor(Date.now()/ 1000)+3600
    }
    const token = jwt.sign(payload,process.env.TOKEN)
    res.send({msg:"Connected  Sucesssfully",token:token})
    }else{
        const que = "INSERT INTO users(_name,_password) VALUES(?,?)"
        await db.query(que,[username,password])
        res.send({msg:"Creation sucessful"})
    }
       }
    
})
const auth =(req,res,next)=>{
   const token = req.headers['authorization']
   const tok = token && token.split(' ')[1]

   if(tok){
    jwt.verify(tok,process.env.TOKEN,(err,decoded)=>{
        if(err) return res.send({err:"Invalid token !"})
        req.user = decoded
    next()
    })
   }
}
router.get("/data",auth,async(req,res)=>{
    try {
        const user = req.user.username
        const query = "SELECT _name FROM users WHERE _name = ?"
       const [resp] = await db.query(query,[user])
       res.send(resp)
      
    } catch (err) {
        console.log(err)
    }
})
router.post("/verify/:name",async(req,res)=>{
   try {
    const name = req.params.name
    if( name ){
        const query = "SELECT COUNT(*) as count FROM users WHERE _name = ?"
        const [resp] = await db.query(query,[name])
        if(resp[0].count > 0 ){
         res.send({msg:"user exist"})
        }else{
        res.send({msg:"user does not exist"})
        }

    }
   } catch (err) {
    console.log(err)
   }
})
router.post("/send",async(req,res)=>{
     const {name,message} = req.body
    try {
        await db.query("INSERT INTO messages VALUES(?,?)",[name,message])
        res.send({msg:"Sent sucessfully"})

    } catch (err) {
       console.log(err) 
    }
})
router.get("/anoy",async(req,res)=>{
    try {
        const [resp] = await db.query("SELECT * FROM messages")
        res.send(resp)
    } catch (err) {
        console.log(err)
    }
})
export default router