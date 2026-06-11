import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { CustomerSession } from "./types";

export async function getCustomerUserSession(){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("reward-system-cus-fong")
        if(!cookie) return null
        const token:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
        if(!token) return null
        if(!token.phone || !token.customerId || !token.name) return null
        const session:CustomerSession = {
            customerId: token.customerId,
            name: token.name,
            phone: token.phone
        }
        return session
    }catch(e:any){
        return null
    } 
}
