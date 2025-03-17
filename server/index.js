import express from "express";
import cors from "cors"
import router from "./router.js";



const app = express()
app.use(cors(
  {  origin : '*',
    methods : ['GET','POST','PUT','DELETE','OPTIONS']
}
))
app.use(express.json())
app.use("/auth",router)
app.get("/",(req,res)=>{
    res.send("<h1>Hellow word i am me</h1>")
})


app.listen(4000,()=>{
    console.log("Connected at port 4000")
})
