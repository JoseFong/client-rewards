"use client"
import { CustomerSession } from "@/lib/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

function HomeComponent({session}:{session:CustomerSession}) {
    const router = useRouter()

    async function logout(){
        try{
            await axios.get("/api/login")
            router.push("/login")
        }catch(e:any){
        if(e.response && e.response.data && e.response.data.message){
            toast.error(e.response.data.message)
        }else{
            toast.error(e.message)
        }
        }
    }

    return (
    <div>
      Información
      <button onClick={logout} className="underline cursor-pointer">Cerrar sesión</button>
      {session.name}
    </div>
  )
}

export default HomeComponent