import { GetQuizById } from "@/actions/quiz";
import { PageProps } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

import QuizBuilder from "./_components/nav/QuizBuilder";

const page = async (props: PageProps) => {
  const quizId = props.params.quizId;
  const quiz = await GetQuizById(quizId);

  if (!quiz) return notFound();
  return <QuizBuilder quiz={quiz} />;
};

export default page;
