import { customerLogin, customerLogout } from "@/controllers/accessController";
import { CustomerExistsPhone } from "@/controllers/customerController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const data = await req.json()

        const exists = await CustomerExistsPhone(data.phone)
        if(!exists) return NextResponse.json({message:"Credenciales Incorrectas."},{status:404})
        
        await customerLogin(data.phone)

        return NextResponse.json({status:200})
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}

export async function GET(){
    try{
        await customerLogout()

        return NextResponse.json({status:200})
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}