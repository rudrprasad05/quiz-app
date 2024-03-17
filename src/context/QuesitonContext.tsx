"use client";

import { uuid } from "@/lib/utils";
import { QuestionType, QuizType } from "@/types";
import { randomUUID } from "crypto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
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

  questions: [],
});

export function QuestionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSession();
  const [questions, setQuestions] = useState<Partial<QuestionType[]>>([]);

  let questionTemp: Partial<QuestionType> = {
    question: "",
    image: "",
    options: ["", "", "", ""],
    quizId: uuid(),
    answer: "A",
  };

  const addQuestion = () => {
    questionTemp.id = uuid();
    console.log(questionTemp.id);
    setQuestions((prev: any) => [...prev, questionTemp]);
    console.log(questions);
  };

  const getQuestions = (question: QuestionType) => {
    setQuestions((prev: any) => [...prev, question]);
  };

  const removeQuestion = (id: string) => {
    let temparr = questions;
    const arrayWithoutD = temparr.filter(function (letter) {
      return letter?.id !== id;
    });

    setQuestions(arrayWithoutD);
  };

  const updateQuestion = (question: Partial<QuestionType>) => {
    const pos = questions.map((e) => e?.id).indexOf(question.id);
    questions[pos] = question as QuestionType;
    console.log(questions);
  };

  const updateOptions = (
    question: Partial<QuestionType>,
    optionIndex: number,
    option: string
  ) => {
    const pos = questions.map((e) => e?.id).indexOf(question.id);
  };

  return (
    <QuesitonContext.Provider
      value={{
        addQuestion,
        questions,
        removeQuestion,
        updateQuestion,
        updateOptions,
      }}
    >
      {children}
    </QuesitonContext.Provider>
  );
}
