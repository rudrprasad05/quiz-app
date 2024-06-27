import { GetQuizByIdWithQuestions } from "@/actions/quiz";
import React from "react";
import QuestionView from "./_components/QuestionView";

type Props = {
  params: { userId: string; superAdminId: string; quizId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: Props) => {
  const quizId = props.params.quizId;

  const quizWithQuestion = await GetQuizByIdWithQuestions(quizId);
  console.log(quizWithQuestion);
  return <QuestionView quiz={quizWithQuestion} />;
};

export default page;
