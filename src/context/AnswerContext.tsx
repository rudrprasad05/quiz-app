"use client";

import { GetQuizWithQuestionsById } from "@/actions/quiz";
import { uuid } from "@/lib/utils";
import { QuestionType, QuizType } from "@/types";
import { randomUUID } from "crypto";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type AnswerContextType = {
  changeOption: (index: number, option: number) => void;
  initQuestions: () => void;
};

export const AnswerContext = createContext<AnswerContextType>({
  changeOption: (index: number, option: number) => {},
  initQuestions: () => {},
});

export function AnswerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSession();
  const params = useParams();
  const quizId = params.quizId;
  const [questions, setQuestions] = useState<Partial<QuestionType[]>>([]);

  const changeOption = (index: number, option: number) => {
    let q = questions[index];
  };

  const initQuestions = async () => {
    const res = await GetQuizWithQuestionsById(quizId as string);
    if (!res) return;
    setQuestions(res.questions);
    console.log(res.questions);
  };

  return (
    <AnswerContext.Provider
      value={{
        changeOption,
        initQuestions,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}
