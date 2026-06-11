import { getCustomerFromId } from "@/controllers/customerController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try{
        const {id} = await params
        
        const idNum:number = parseInt(id)
        const customer = await getCustomerFromId(idNum)

        return NextResponse.json(customer)
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}