"use client"
import { CustomerSession } from "@/lib/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import logoutIcon from "@/assets/icons8-logout-50.png"
import { useEffect, useState } from "react"
import { Customer } from "@/app/generated/prisma/client"

import coffee from "@/assets/6030268.png"
import coffeeGray from "@/assets/output-smallpngtools.png"

import diamond from "@/assets/diamond.png"
import gold from "@/assets/gold.png"
import silver from "@/assets/silver.png"
import bronze from "@/assets/bronze.png"

function HomeComponent({session}:{session:CustomerSession}) {
    const [lastVisit,setLastVisit] = useState("")
    const [customer,setCustomer] = useState<Customer>()
    const [customerStamps,setCustomerStamps] = useState<any>(0)
    const router = useRouter()

    const [medal,setMedal] = useState("")
    const [visitsForNext,setVisitsForNext] = useState(0)
    const [percent,setPercent] = useState(0)

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

    const bronce = "https://cdn-icons-png.flaticon.com/512/3275/3275655.png"


    useEffect(()=>{
        if(customer){
            const nowDate = new Date().getTime()
            const lastVisitDate = new Date(customer.lastVisit).getTime()
            const diff = Math.abs(nowDate-lastVisitDate)
            const diffDays = Math.floor(diff/(1000*60*60*24))
            setLastVisit(diffDays+"")
            setCustomerStamps(customer.stamps)

            let medala = "Bronce"
            let remaining = 10-customer.visits
            let newStart = customer.visits
            let porc = newStart*100/10
            if(customer.visits>=10){
                medala = "Plata"
                remaining = 25-customer.visits
                newStart = customer.visits-10
                porc = newStart*100/15
            }
            if(customer.visits>=25){
                medala = "Oro"
                remaining = 50-customer.visits
                newStart = customer.visits-25
                porc = newStart*100/25
            }
            if(customer.visits>=50){
                medala = "Diamante"
                remaining = -1
                porc = -1
            }
            setMedal(medala)
            setVisitsForNext(remaining)
            setPercent(Math.floor(porc))
        }
    },[customer])

   

    async function getCustomerInformation(){
        try{
           const response = await axios.get("/api/customers/"+session.customerId) 
            setCustomer(response.data)
        }catch(e:any){
            if(e.response && e.response.data && e.response.data.message){
                toast.error(e.response.data.message)
            }else{
                toast.error(e.message)
            }
        }
    }

    useEffect(()=>{
        getCustomerInformation()
    },[])

    return (
    <div className="w-full h-screen min-h-screen bg-zinc-50">
        <div className="p-2 text-sm text-center shadow-lg">Última visita hace {lastVisit} dia(s).</div>
        <div style={{backgroundColor:"#b8a182"}} className="p-8 pb-15 relative">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-2xl">Bienvenido</p>
                    <h1 className="text-3xl">{session.name}</h1>
                </div>
                <button onClick={logout} className="w-8 cursor-pointer">
                    <Image src={logoutIcon} alt="Cerrar Sesion"/>
                </button>
            </div>
            <div className="absolute top-full px-6 -translate-y-7 left-0 h-56 w-full flex flex-col gap-3">
                <div className="w-full bg-white shadow-lg rounded-lg p-5 text-lg flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        {Array.from({length:5}).map((_,index)=>(
                            <Image className="w-1/6" key={index} src={index < customerStamps ? coffee : coffeeGray} alt="Café"/>
                        ))}
                    </div>
                    <p className="text-sm text-center mt-1">Te faltan {5-customerStamps} sellos para tu bebida gratis.</p>
                </div>
                <div className="w-full bg-white shadow-lg rounded-lg p-5 text-lg flex flex-row gap-6">
                    <Image className="w-12 object-contain" src={medal==="Bronce" ? bronze : (medal==="Plata" ? silver : (medal==="Oro" ? gold : diamond))} alt="Medalla"/>
                    <div className="flex flex-col w-full">
                        <p className="font-semibold">{medal}</p>
                        {medal !== "Diamante" && <p className="text-sm">Faltan {visitsForNext} visitas para el siguiente nivel.</p>}
                        <div className="w-full h-2 bg-zinc-500 mt-3 rounded-2xl relative">
                            {medal !== "Diamante" ? 
                                <div className="h-2 bg-green-400 rounded-2xl absolute top-0 left-0" style={{width:percent+"%"}}></div>
                            :
                                <div className="h-2 bg-green-400 rounded-2xl absolute top-0 left-0 w-full"></div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
  )
}

export default HomeComponent