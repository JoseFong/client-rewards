"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function LoginPage() {
  const [clicked,setClicked] = useState(false)
  const [phone,setPhone] = useState("")

  const router = useRouter()

  function click(){
    setClicked(true)
  }

  async function go(){
    try{
      if(phone.trim()==="") throw new Error("Ingrese un número telefónico.")
      if(/[a-zA-Z]/.test(phone)) throw new Error("Número de teléfono inválido.")

        const data = {
          phone:phone.trim().replaceAll(" ","")
        }

      await axios.post("/api/login",data)

        router.push("/")
    }catch(e:any){
      if(e.response && e.response.data && e.response.data.message){
        toast.error(e.response.data.message)
      }else{
        toast.error(e.message)
      }
    }
  }

  useEffect(()=>{
    function handleEnter(e:KeyboardEvent){
      if(clicked && e.key==="Enter") go()
    }

    document.addEventListener("keydown",handleEnter)

    return () => {
      document.removeEventListener("keydown",handleEnter)
    } 
  },[clicked,phone])

  return (
    <div className="w-full h-screen min-h-screen gap-6 flex flex-col p-10 items-center justify-center" style={{backgroundColor:"#f2e9dc"}}>
        {!clicked && <div onClick={click} className="absolute top-0 left-0 h-screen w-screen z-10"></div>}
        <img className="w-1/3" src="https://freepngimg.com/save/62031-logo-ristretto-coffee-cafe-cup-free-transparent-image-hd/956x736"/>
        <div className="h-2/3 w-5/6 flex flex-col items-center gap-5 justify-center">
          <h1 className={`transition-all font-bold text-xl ${clicked ? "opacity-0 pointer-events-none" : "opacity-100"}`}>Para comenzar presione la pantalla</h1>
          <div className={`transition-all bg-zinc-200 h-full w-full ${clicked ? "opacity-0 pointer-events-none" : "opacity-100"}`}  style={{backgroundImage:"url(https://media.istockphoto.com/id/1711587476/photo/young-smiling-woman-enjoying-in-smell-of-fresh-coffee-at-home.jpg?s=612x612&w=0&k=20&c=Z9voEWaSRJ27RUi_6iy1YK2WwwGhw7mIPRNNlndheGU=)", borderRadius:"200px", backgroundSize:"cover", backgroundPosition:"center"}}></div>
          <div className={`absolute transition-all flex flex-col gap-3 ${clicked ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <label className="font-bold text-2xl">Número de teléfono</label>
            <input style={{backgroundColor:"#3b2313"}} className="text-white py-4 px-4 rounded-2xl text-xl" placeholder="Ej. 6862338904" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <button onClick={go} className="text-lg font-bold">Continuar</button>
          </div>
        </div>
        <p className="z-20 p-4 cursor-pointer">Mas información</p>
    </div>
  )
}

export default LoginPage