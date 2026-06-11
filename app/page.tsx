import HomeComponent from "@/Components/HomeComponent"
import { getCustomerUserSession } from "@/lib/session"
import { CustomerSession } from "@/lib/types"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

async function page() {

  const session:CustomerSession|null = await getCustomerUserSession()
  if(!session) redirect("/login")

  return (
    <HomeComponent session={session}/>
  )
}

export default page