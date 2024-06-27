"use client";

import { QuizByIdWithQuestionsType } from "@/types";
import React, { useContext, useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { AnswerContext } from "@/context/AnswerContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Attempt, MultipleChoice } from "@prisma/client";
import { CreateAttempt } from "@/actions/quiz";

const mc = ["a", "b", "c", "d"];

const QuestionView = ({ quiz }: { quiz: QuizByIdWithQuestionsType }) => {
  const params = useParams();
  const userId = params.userId;

  const [answers, setAnswers] = useState<string[]>(
    new Array(quiz?.questions.length).fill("")
  );

  const handleSubmit = async () => {
    const ans = quiz?.questions.map((q) => q.answer.toLowerCase());
    let score = 0;
    ans?.map((a, index) => {
      if (a == answers[index]) {
        score++;
      }
    });
    console.log(score);

    let attemp: Partial<Attempt> = {
      total: score,
      userId: userId as string,
      quizId: quiz?.id as string,
      answers: answers.map((a) => a.toUpperCase() as MultipleChoice),
    };

    await CreateAttempt(attemp);
  };
  return (
    <div className="p-12 ">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{quiz?.unit.code}</h1>
          <h1 className="text-xl">{quiz?.topic}</h1>
          <h2 className="text-sm text-muted-foreground">Week: {quiz?.week}</h2>
        </div>
        <div>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>

      <div className="py-6">
        <h1>Instructions</h1>
        <ul className="text-sm list-disc pl-4">
          <li>Select an option by clicking on it</li>
          <li>Press submit whenever youre done</li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        {quiz?.questions.map((question, index) => (
          <Card className="relative flex flex-row p-6">
            <div className="pr-3 text-muted-foreground">Q{index + 1}</div>

            <div className="pl-3 grow">
              <h2>{question.question}</h2>
              <div className="grid grid-cols-2 pt-6 gap-3">
                {Array.from(Array(4).keys()).map((i, jndex) => (
                  <Card
                    key={jndex}
                    onClick={() =>
                      setAnswers((prev) => {
                        prev[index] = mc[i];
                        console.log(prev);
                        return [...prev];
                      })
                    }
                    className={cn(
                      "",
                      answers[index] == mc[i] && "bg-slate-500"
                    )}
                  >
                    <CardContent className="flex gap-3 items-center p-3">
                      <h3 className="flex gap-[1px] text-muted-foreground">
                        <span>{mc[i]}</span>
                        <span>{`)`}</span>
                      </h3>
                      <h3>{question.options[jndex]} </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionView;
