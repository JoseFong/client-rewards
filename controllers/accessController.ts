import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function customerLogin(phone:string){
    const customer = await prisma.customer.findFirst({
        where: {
            phone: phone
        }
    })
    if(!customer) throw new Error("Error al iniciar sesión.")

    const token = jwt.sign({customerId:customer.id,phone:customer.phone,name:customer.name},process.env.JWT_SECRET!)

    const cookieStore = await cookies()
    cookieStore.set("reward-system-cus-fong",token)
}

export async function customerLogout(){
    const cookieStore = await cookies()
    cookieStore.delete("reward-system-cus-fong")
}