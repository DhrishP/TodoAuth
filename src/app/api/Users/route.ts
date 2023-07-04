import { NextResponse } from "next/server"
import prisma from "../../../../prisma/client"


// export async function GET(req:Request){

// }

export async function POST(req:Request){
    try{
    const {username,email,password} = await req.json()
    const data = await prisma.user.create({data:{email:email,username:username,password:password}})
    if(!data) throw new Error("cant input the data")
    return NextResponse.json(data)
    }catch(err){
        console.log(err)
    }
}