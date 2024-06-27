"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { NewUnitType } from "@/app/(superadmin)/superadmin/[superAdminId]/units/_components/NewUnitButton";
import { NewQuizType } from "@/app/(admin)/admin/[userId]/quiz/_components/NewQuizButton";
import { QuestionType } from "@/types";
import { Attempt } from "@prisma/client";

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

export const GetAllQuizesWithUnit = async () => {
  try {
    const res = await prisma.unit.findMany({
      include: {
        quizes: {
          include: {
            attempts: true,
          },
        },
      },
    });

    if (!res) {
      return null;
    }

    return res;
  } catch (error) {
    return null;
  }
};

export const CreateNewQuiz = async (data: NewQuizType) => {
  const { week, topic, maxAttempts, authorId, unitId } = data;
  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
  });
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
  return res;
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

export const GetQuizByIdWithQuestions = async (id: string) => {
  const res = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
      unit: true,
    },
  });

  if (!res) return null;
  return res;
};

export const SaveQuiz = async (id: string, data: QuestionType[]) => {
  console.log(data);
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    let { question, options, quizId, refId, image, answer } = data[i];
    console.log(options);
    console.log(data[i]);
    let res = await prisma.question.upsert({
      where: {
        refId: refId as string,
      },
      update: {
        question,
        options,
        image,
        answer,
      },
      create: {
        question,
        options,
        refId,
        image,
        answer,
        quizId,
      },
    });
    arr.push(res);
  }

  return arr;
};

export const GetQuizWithQuestionsById = async (id: string) => {
  const res = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });

  return res;
};

export const CreateAttempt = async (data: Partial<Attempt>) => {
  const { total, userId, quizId, answers } = data;
  const res = await prisma.attempt.create({
    data: {
      total: total as number,
      userId: userId as string,
      quizId: quizId as string,
      answers,
    },
  });
  return res;
};

export const GetQuizWithAttempts = async (id: string) => {
  const res = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      attempts: true,
    },
  });
  return res;
};
