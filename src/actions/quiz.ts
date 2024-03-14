"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { NewUnitType } from "@/app/(superadmin)/superadmin/[superAdminId]/units/_components/NewUnitButton";
import { NewQuizType } from "@/app/(admin)/admin/[userId]/quiz/_components/NewQuizButton";

export const GetAllQuizeForOneUnit = async (authorId: string) => {
  try {
    const unit = await prisma.quiz.findMany({
      where: {
        authorId: authorId,
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

export const CreateNewQuiz = async (data: NewQuizType) => {
  const { week, topic, maxAttempts, authorId, unitId } = data;
  const res = await prisma.quiz.create({
    data: {
      week: parseInt(week),
      topic,
      maxAttempts: parseInt(maxAttempts),
      authorId,
      unitId,
      isPublished: false,
    },
  });
};

export const GetQuizById = async (id: string) => {
  const res = await prisma.quiz.findUnique({
    where: {
      id,
    },
  });

  if (!res) return null;
  return res;
};
