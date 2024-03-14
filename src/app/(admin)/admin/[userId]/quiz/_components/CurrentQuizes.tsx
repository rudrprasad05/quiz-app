import { GetAllQuizeForOneUnit } from "@/actions/quiz";
import { GetCurrentUserOnly, GetCurrentUserWithUnit } from "@/actions/user";
import Title from "@/components/global/Title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GetAllQuizeForOneUnitType } from "@/types";
import React from "react";
import NewQuizButton from "./NewQuizButton";
import DraftQuizes from "./DraftQuizes";
import PublishedQuizes from "./PublishedQuizes";

const CurrentQuizes = async ({ userId }: { userId: string }) => {
  const user = await GetCurrentUserWithUnit();

  if (!user) return null;
  const allQuizesForThisUnit = await GetAllQuizeForOneUnit(userId);
  return (
    <div>
      <div className="flex gap-6 items-center">
        <Title user={user} title={"Quizes"} />
        <NewQuizButton user={user} />
      </div>
      <div className="py-6">
        <PublishedQuizes data={allQuizesForThisUnit} />
        <DraftQuizes data={allQuizesForThisUnit} />
      </div>
    </div>
  );
};

export default CurrentQuizes;
