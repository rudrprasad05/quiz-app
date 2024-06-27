"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";

export const GetCurrentUserOnly = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export const GetCurrentUserWithUnit = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        passUnit: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export const GetCurrentUserOnlyById = async (id: string) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export const GetUsersWithAttempts = async () => {
  const currentUser = await prisma.user.findMany({
    include: {
      attempts: true,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
};
