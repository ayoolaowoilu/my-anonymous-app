import { FormEvent, useState } from "react"
import axios from "axios"

export default function Login(){
  
    const [profile,setprofile] = useState({
        username:"",
        passwpord:""
    })
    const [sta,setsta] = useState<Boolean>(false)
    const [msg,setmsg] = useState<String>("")
    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
            setprofile({...profile,[e.target.name]:e.target.value})
           
    }
    const handleSubmit = async(e:FormEvent) =>{
         e.preventDefault()
         setsta(false)
         setmsg("")
         try {
            const res = await axios.post("https://my-anonymous-app-3.onrender.com/auth/login",profile)
          localStorage.setItem("token",res.data.token)
            setmsg(res.data.msg)
            setsta(true)
         } catch (err) {
            console.log(err)
         }
    }
return(
    <>
    {sta ? <div className="w-screen h-screen backdrop-blur-xl grid place-content-center fixed ">
        <div className="bg-white p-[10px] grid place-content-center w-[500px] rounded-xl border-2 ">
             <div className="text-center font-bold text-2xl">{msg}</div>
             {msg === "Creation sucessful" ? <button onClick={()=>setsta(false)} className=" m-[10px] mx-auto w-full p-[10px] rounded-xl text-white bg-black ">Login again</button> : 
             <div>
                <button onClick={()=>setsta(false)} className=" m-[10px] mx-auto w-full p-[10px] rounded-xl text-white bg-black ">Login again</button>
                <button className=" m-[10px] mx-auto w-full p-[10px] rounded-xl text-white bg-black "><a href="/home">Proceed to home page</a></button>
             </div>
             }
            

        </div>
    </div> : null}
   <div className="min-h-screen grid place-content-center">
    <form onSubmit={handleSubmit} className="w-4/5 p-[10px] border-2 shadow-xl rounded-xl mx-auto ">
    <div className="max-w-[600px]">
        Input username to create your account or if already you have created an account Still input your username to login
    </div>
    <input type="text" className="w-full mx-auto m-[10px] border-2 p-[10px] rounded-xl " name="username" onChange={handlechange} placeholder="Input username"  />
    <div>Create a password to ensure safety of your messages or if you already have an account simply input your password to login</div>
    <input type="password" className="w-full mx-auto m-[10px] border-2 p-[10px] rounded-xl " name="password" onChange={handlechange} placeholder="Input password"  />
    <button className="mx-auto w-full p-[10px] rounded-xl text-white bg-black ">GO...</button>
    </form>
   </div>
    </>
)
}