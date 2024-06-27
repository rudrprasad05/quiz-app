"use client";

import Title from "@/components/global/Title";
import { GetQuizWithAttemptsType } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

const DetailsView = ({ quiz }: { quiz: GetQuizWithAttemptsType }) => {
  const params = useParams();
  const userId = params.userId;

  const myAttempts = quiz?.attempts.filter((i) => i.userId == userId);

  console.log(quiz?.attempts);
  return (
    <div className="flex flex-col gap-6 pt-6">
      <div>
        <h1>{quiz?.topic}</h1>
        <h2>Week: {quiz?.week}</h2>
      </div>
      <div>
        <Title title={"Your Attempts"} />
        <div>
          {(myAttempts?.length == 0 || myAttempts == null) && <>No attempts</>}
          {myAttempts?.map((i) => i.total)}
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
