"use client";

import { GetQuizWithQuestionsById } from "@/actions/quiz";
import { uuid } from "@/lib/utils";
import { QuestionType, QuizType } from "@/types";
import { randomUUID } from "crypto";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type QuesitonContextType = {
  addQuestion: () => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (question: Partial<QuestionType>) => void;
  updateOptions: (
    question: Partial<QuestionType>,
    optionIndex: number,
    option: string
  ) => void;
  questions: Partial<QuestionType[]>;
  initQuestions: () => void;
};

export const QuesitonContext = createContext<QuesitonContextType>({
  addQuestion: () => {},
  removeQuestion: (id: string) => {},
  updateQuestion: (question: Partial<QuestionType>) => {},
  updateOptions: (
    question: Partial<QuestionType>,
    optionIndex: number,
    option: string
  ) => {},
  initQuestions: () => {},

  questions: [],
});

export function QuestionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSession();
  const params = useParams();
  const quizId = params.quizId;
  const [questions, setQuestions] = useState<Partial<QuestionType[]>>([]);

  let questionTemp: Partial<QuestionType> = {
    question: "",
    image: "",
    options: ["", "", "", ""],
    quizId: (quizId as string) || uuid(),
    answer: "A",
  };

  const initQuestions = async () => {
    const res = await GetQuizWithQuestionsById(quizId as string);
    if (!res) return;
    setQuestions(res.questions);
    console.log(res.questions);
  };

  const addQuestion = () => {
    questionTemp.refId = uuid();
    questionTemp.quizId = quizId as string;
    setQuestions((prev: any) => [...prev, questionTemp]);
    console.log(questions);
  };

  const getQuestions = (question: QuestionType) => {
    setQuestions((prev: any) => [...prev, question]);
  };

  const removeQuestion = (id: string) => {
    let temparr = questions;
    const arrayWithoutD = temparr.filter(function (letter) {
      return letter?.refId !== id;
    });

    setQuestions(arrayWithoutD);
  };

  const updateQuestion = (question: Partial<QuestionType>) => {
    const pos = questions.map((e) => e?.refId).indexOf(question.refId);
    questions[pos] = question as QuestionType;
    console.log(questions);
  };

  const updateOptions = (
    question: Partial<QuestionType>,
    optionIndex: number,
    option: string
  ) => {
    const pos = questions.map((e) => e?.refId).indexOf(question.refId);
  };

  return (
    <QuesitonContext.Provider
      value={{
        addQuestion,
        questions,
        removeQuestion,
        updateQuestion,
        updateOptions,
        initQuestions,
      }}
    >
      {children}
    </QuesitonContext.Provider>
  );
}
