import prisma from "@/lib/prisma";

export async function CustomerExistsPhone(phone:string){
    const customer = await prisma.customer.findFirst({
        where: {
            phone: phone
        }
    })
    return customer
}

export async function getCustomerFromId(id:number){
    const customer = await prisma.customer.findFirst({
        where: {
            id: id
        }
    })
    return customer
}