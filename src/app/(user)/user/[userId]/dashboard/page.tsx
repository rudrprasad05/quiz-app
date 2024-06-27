import { GetAllQuizeForOneUnit, GetAllQuizesWithUnit } from "@/actions/quiz";
import { GetCurrentUserOnly, GetUsersWithAttempts } from "@/actions/user";
import Title from "@/components/global/Title";
import React from "react";

import Leaderboard from "./_components/Leaderboard";
import QuizCard from "./_components/QuizCard";

const page = async () => {
  const user = await GetCurrentUserOnly();
  const allQuizes = await GetAllQuizesWithUnit();
  const usersWithAttempts = await GetUsersWithAttempts();

  console.log(usersWithAttempts);

  return (
    <div className="p-12 grow">
      <Title title="Welcome" user={user}></Title>
      <div>
        <h1 className="text-xl py-6">Quizes</h1>
        <QuizCard units={allQuizes} />
      </div>
      <div className="py-6">
        <Title title="Leaderboard" />
      </div>
      <Leaderboard user={usersWithAttempts} />
    </div>
  );
};

export default page;
