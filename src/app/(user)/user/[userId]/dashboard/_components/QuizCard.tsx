"use client";

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
              <CardFooter>
                <CardDescription>{quiz.topic}</CardDescription>
                <Link href={`/user/${userId}/quiz/${quiz.id}/attempt`}>
                  Attempt
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
