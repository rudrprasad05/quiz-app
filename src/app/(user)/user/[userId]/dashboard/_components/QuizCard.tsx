"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  QuestionType,
  QuizType,
  UnitWithAllQuizes,
  UnitsOnlyType,
} from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const QuizCard = ({ units }: { units: any }) => {
  const params = useParams();
  const userId = params.userId;
  console.log(units);
  return (
    <>
      {units.map((unit: any) => (
        <div className="grid grid-cols-3 gap-6" key={unit.id}>
          {unit.quizes.map((quiz: any) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{unit.code}</CardTitle>
                <CardDescription>Week {quiz.week}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row justify-between">
                <CardDescription>{quiz.topic}</CardDescription>
                <Link
                  className={buttonVariants({ variant: "link" })}
                  href={`/user/${userId}/quiz/${quiz.id}/details`}
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ))}
    </>
  );
};

export default QuizCard;
