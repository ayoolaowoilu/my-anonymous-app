import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Quer(){
   const { name } = useParams()
   const [msg,setmsg] = useState<String>("")
   const [message,setmessage] = useState<String>("")
   const [info,setinfo] = useState<String>("")
   const [dis,setdis] = useState<Boolean>(false)

   const verify =async()=>{
       try {
         const resp = await axios.post(`https://my-anonymous-app-3.onrender.com/auth/verify/${name}`)
         setmsg(resp.data.msg)
         console.log(resp.data)
       } catch (err) {
        console.log(err)
       }
   }
   const handlechange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
          setmessage(e.target.value)
   }
   useEffect(()=>{ 
    verify()
   },[])
   return(
    <>
       {dis ? <div className=" fixed h-screen w-screen grid place-content-center backdrop-blur-xl ">
         <div className="bg-white p-[10px] rounded-xl w-[600px]">
            {info}
            <button className="w-full mx-auto p-[10px] m-[10px] bg-black text-white rounded-xl " onClick={()=>setdis(false)}>GO back</button>
            <div className="text-center">You too can get anoynymous messages just click the register button for clarity </div>
            <button  className="w-full mx-auto p-[10px] m-[10px] bg-black text-white rounded-xl" ><a href="/login">Register now </a></button>
         </div>
         </div> : null}
      <div className="min-h-screen mx-auto grid place-content-center  bg-gradient-to-r from-red-500 var-yellow-500 to-green-500 ">

        {msg === "user exist" ? 
        <div className="w-[600px] rounded-xl border-2 shadow-xl p-[10px] bg-white ">
            <div className=" mx-auto text-center m-[10px] font-bold text-2xl">Send anoynymous texts to @{name} </div>
                <div className="mx-auto">
                    <textarea onChange={handlechange} className="w-full mx-auto border-2 bg-[#ccc] rounded-xl p-[10px] m-[10px]" placeholder="Send Risky text here">

                    </textarea>
                    </div>  
                    <button onClick={async()=>{
                       try {
                          const res = await axios.post("https://my-anonymous-app-3.onrender.com/auth/send",{name,message})
                          setinfo(res.data.msg)
                          setdis(true)
                       } catch (err) {
                         console.log(err)
                       }
                    }} className="w-full m-[10px] p-[10px] rounded-xl mx-auto bg-black text-white">Send message</button>           
        </div>
         : <div className="w-[600px] rounded-xl border-2 shadow-xl p-[10px] bg-white">This user does not exist </div>}
      </div>
    </>
   )
}