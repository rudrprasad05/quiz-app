import { GetAllQuizeForOneUnit, GetAllQuizesWithUnit } from "@/actions/quiz";
import { GetCurrentUserOnly } from "@/actions/user";
import Title from "@/components/global/Title";
import React from "react";
import QuizCard from "./_components/QuizCard";

const page = async () => {
  const user = await GetCurrentUserOnly();
  const allQuizes = await GetAllQuizesWithUnit();
  console.log(allQuizes);
  return (
    <div className="p-12 grow">
      <Title title="Welcome" user={user}></Title>
      <div>
        <h1>Quizes</h1>
        <QuizCard units={allQuizes} />
      </div>
    </div>
  );
};

export default page;
