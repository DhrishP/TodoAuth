import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req:NextRequest){
    const {id,input} = await req.json()
    const res = await prisma.todo.update({
        where:{
            id:id
        },
        data:{
            task:input
        }
    })
    if (res) {
        return NextResponse.json(res)
    }
    return NextResponse.error()
        
    
}