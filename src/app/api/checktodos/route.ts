import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req:NextRequest){
    const {email} = await req.json()
        const data = await prisma.user.findFirst({
            where: {
             email:email,
            },
            select:{
             id:true
            }
           });
           if (data) {
            const res = await prisma.todo.findMany({
                where:{
                    userId:data.id
                }
            })
            
            return NextResponse.json(res)
           }
    
    
        return NextResponse.error()
}