import React from "react";
import QuizBuilder from "./_components/QuizBuilder";
import { PageProps } from "@/types";
import { GetQuizById } from "@/actions/quiz";
import { notFound } from "next/navigation";

const page = async (props: PageProps) => {
  const quizId = props.params.quizId;
  const quiz = await GetQuizById(quizId);

  if (!quiz) return notFound();
  return <QuizBuilder quiz={quiz} />;
};

export default page;
