import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import {hashPass} from "../../../../lib/passhash";
import { error } from "console";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    const hashedpass = await hashPass(password);
    const isPresent = await prisma.user.findUnique({
      where:{
        email : email
      }
    })
    if(isPresent) return NextResponse.error()
    const data = await prisma.user.create({
      data: { email: email, name: username, password: hashedpass },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
