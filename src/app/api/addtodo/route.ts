import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";


export async function POST(req:NextRequest){
    const {email,task} = await req.json()
    const res = await prisma.user.update({
        where:{
         email:email as string,
        },
        data:{
          todo:{
            create:{
              task:task as string,
            }
          }
        }
      })
      if (res) {
        return NextResponse.json(res)
      }
      return NextResponse.error()
}