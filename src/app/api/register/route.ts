import { RegisterFormType } from "@/app/(auth)/register/_components/RegisterForm";
import prisma from "@/lib/prismadb";

import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: RegisterFormType = await request.json();
  const { email, name, password, role, image, course, phone, passUnit } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing Info", { status: 400 });
  }

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailUsed)
    return new NextResponse("Email already in use", { status: 401 });

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(body);
  const createdUser = await prisma.user.create({
    data: {
      hashedPassword,
      email,
      name,
      image,
      course,
      phone,
      // passUnit,
      role: role as Role,
    },
  });

  return NextResponse.json(createdUser);
}
