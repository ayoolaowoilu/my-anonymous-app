import axios from "axios"
import { useEffect,useState } from "react"


export default function Home(){
    const token = localStorage.getItem("token")
    const [name,setname] = useState<String>("")
      const get =async()=>{
         const res = await axios.get("https://my-anonymous-app-3.onrender.com/auth/data",{
            headers : { authorization :`bearer ${token}`}
         })
        setname(res.data[0]._name)
      }
      const handlecopy =async()=>{
        const link = `https://my-anonymous-app-3.onrender.com/query/${name}`
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
            const resp =await axios.get("https://my-anonymous-app-3.onrender.com/auth/anoy")
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
          <a
  href="#"
  className="relative block overflow-hidden rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        Welcome {name} Start recieving anoymous messages
      </h3>

      <p className="mt-1 text-xs font-medium text-gray-600">Welcome {name}</p>
    </div>

    <div className="hidden sm:block sm:shrink-0">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        className="size-16 rounded-lg object-cover shadow-xs"
      />
    </div>
  </div>

  <div className="mt-4">
    <p className="text-sm text-pretty text-gray-500">
      In this app just send a link to your friends so they can send you anoymous messages 
    </p>
    <div className="border-b-4 p-[10px]">http::5473/query/{name}</div>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col-reverse">
    <button onClick={logout} className="bg-blue-500 text-white p-[10px] rounded-xl ">logout</button>
    </div>

    <div className="flex flex-col-reverse">
    <button onClick={handlecopy} className="bg-blue-500 text-white p-[10px] rounded-xl ">Copy-link</button>
    </div>
    <div className="flex flex-col-reverse">
    You have {my.length} messages 
    </div>
    <div onClick={()=>{setsta(false)
     
    }} className="flex flex-col-reverse">
    <button  className="bg-blue-500 text-white p-[10px] rounded-xl ">Messages</button>
    </div>
  </dl>
</a> </div> : dis ? <div className="min-h-screen grid place-content-center bg-gradient-to-r from-red-500 var-yellow-500 to-green-500 ">

<article className="rounded-xl bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
  <div className="flex items-start sm:gap-8">
    <div
      className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1">
        <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
      </div>
    </div>

    <div>
      <strong
        className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
      >
        Anoyonim
      </strong>

      <h3 className="mt-4 text-lg font-medium sm:text-xl">
        <a href="#" className="hover:underline"> Some Interesting Podcast Title </a>
      </h3>

      <p className="mt-1 text-sm text-gray-700">
       {info}
      
      </p>

      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <p className="text-xs font-medium">48:32 minutes</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
          Featuring-3 <a href="#" className="underline hover:text-gray-700">Barry</a>,
          <a href="#" className="underline hover:text-gray-700">Sandra</a> and
          <a href="#" className="underline hover:text-gray-700">August</a>
        </p>
      </div>
    </div>
  </div>
</article>
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