import express from "express";
import cors from "cors"
import router from "./router.js";



const app = express()
app.use(cors(
  {  origin : '*',
    methods : ['GET','POST','PUT','DELETE','OPTIONS'],
    
}
))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin','X-Requested-With','Content-Type','Accept')
    res.header('Access-Control-Allow-Methods','GET , POST , PUT , DELETE , OPTIONS')
    next()
})
app.use(express.json())
app.use("/auth",router)
app.get("/",(req,res)=>{
    res.send("<h1>Hellow word i am me</h1>")
})


app.listen(4000,()=>{
    console.log("Connected at port 4000")
})
