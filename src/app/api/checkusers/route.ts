import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { passcompare } from "../../../../lib/passhash";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        name: true,
      },
    });
    if (data) {
      if (passcompare(data.password!, password)) {
        return NextResponse.json(data);
      } else {
        alert("wrong password");
      }
    } else {
      alert("Wrong Credentials");
    }
  } catch (err) {
    console.log(err);
  }
}
