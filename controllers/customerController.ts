import prisma from "@/lib/prisma";

export async function CustomerExistsPhone(phone:string){
    const customer = await prisma.customer.findFirst({
        where: {
            phone: phone
        }
    })
    return customer
}