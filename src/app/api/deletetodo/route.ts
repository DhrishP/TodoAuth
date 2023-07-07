import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const { id,userId } = await req.json();
  const res = await prisma.todo.delete({
    where:{
        id:id
    }
  })
  if (res) {

    return NextResponse.json(res)
  }

    return NextResponse.error()
    
}
