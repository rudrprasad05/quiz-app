"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { NewUnitType } from "@/app/(superadmin)/superadmin/[superAdminId]/units/_components/NewUnitButton";

export const CreateUnit = async (data: NewUnitType) => {
  try {
    const unit = await prisma.unit.create({
      data: {
        leaderId: data.leaderId as string,
        code: data.code,
      },
    });

    if (!unit) {
      return null;
    }

    return unit;
  } catch (error) {
    return null;
  }
};

export const GetAllUnitsOnly = async () => {
  const res = await prisma.unit.findMany();
  if (!res) return null;
  return res;
};
