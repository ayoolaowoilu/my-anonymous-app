import axios from "axios"
import { useEffect,useState } from "react"


export default function Home(){
    const token = localStorage.getItem("token")
    const [name,setname] = useState<String>("")
      const get =async()=>{
         const res = await axios.get("http://localhost:4000/auth/data",{
            headers : { authorization :`bearer ${token}`}
         })
        setname(res.data[0]._name)
      }
      const handlecopy =async()=>{
        const link = `http://localhost:5173/query/${name}`
          try {
            await navigator.clipboard.writeText(link)
          } catch (err) {
            console.log("There was an error coping this text")
          }
      }
      const logout =()=>{
        localStorage.removeItem("token")
      }
      const [data,setdata] = useState([{
        _name:"",
        message:""
      }])
      const getmsg = async() =>{
          try {
            const resp =await axios.get("http://localhost:4000/auth/anoy")
           setdata(resp.data)
          } catch (err) {
            console.log(err)
          }
      }
      const [sta,setsta] =useState<Boolean>(true)
      const my = data.filter(da => da._name === name)
      const [dis,setdis] = useState<Boolean>(false)
      const [info , setinfo] = useState<String>("")

      useEffect(()=>{
        get()
        getmsg()
      },[])
    return(
      <>
        {sta ? <div  className="min-h-screen grid place-content-center bg-gradient-to-r from-red-500 var-yellow-500 to-green-500 ">
            <div  className="p-[10px] border-2 rounded-xl shadow-xl mx-auto bg-white w-[500px] backdrop-blur-xl ">
             <div className="text-center font-bold text-2xl "> welcome {name}
             
             </div>
             <div className="">Your link for the sesh! :</div>
              <div className=" p-[10px] mx-auto rounded-xl bg-blue-500 text-white w-full ">http://localhost:5173/query/{name}</div>
              <div><button className="p-[10px] bg-black text-white rounded-xl m-[10px]" onClick={handlecopy}>copy</button>
               you have {my.length} messages 
               <button onClick={()=>setsta(false)} className="p-[10px] bg-black text-white rounded-xl m-[10px]" >Messages</button>
               <button onClick={logout} className="p-[10px] bg-black text-white rounded-xl m-[10px]" ><a href="">logout</a></button>
               </div>
              <div className="text-center">After copying this link you can share with your friends so you can recieve anonymous messages </div>
            </div>
            

        </div> : dis ? <div className="min-h-screen grid place-content-center bg-gradient-to-r from-red-500 var-yellow-500 to-green-500 ">

           <div className="mx-auto bg-white w-[600px] p-[10px] rounded-xl shadow-xl ">
                  {info}
           </div>
           <button onClick={()=>{setdis(false)}} className="mx-auto w-full p-[10px] m-[10px] rounded-xl bg-black text-white">back</button>
           
        </div>: <div className="min-h-screen grid place-content-center bg-gradient-to-r from-red-500 var-yellow-500 to-green-500 ">
             <div className="mx-auto bg-white w-[600px] p-[10px] rounded-xl shadow-xl ">
             {my.map((m ,index)=> (
                <div key={index} className="p-[10px] m-[10px] mx-auto bg-[#ccc] rounded-xl w-full" onClick={()=>{
                    setdis(true)
                    setinfo(m.message)
                }}>{index + 1}. {m.message}</div>
              ))}
              <button onClick={()=>{setsta(true)}} className="mx-auto w-full p-[10px] m-[10px] rounded-xl bg-black text-white">Cancel</button>
             </div>
             
             </div>}
      </>
    )
}