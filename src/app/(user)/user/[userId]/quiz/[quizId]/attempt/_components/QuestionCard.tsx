"use client";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionType } from "@/types";
import React from "react";

const mc = ["a", "b", "c", "d"];

const QuestionCard = ({
  question,
  index,
}: {
  question: QuestionType;
  index: number;
}) => {
  return (
    <Card className="relative flex flex-row p-6 rounded-tr-none">
      <div className="pr-3 text-muted-foreground">Q{index + 1}</div>

      <div className="pl-3 grow">
        <h2>{question.question}</h2>
        <div className="grid grid-cols-2 pt-6 gap-3">
          {Array.from(Array(4).keys()).map((i, index) => (
            <Card className="">
              <CardContent className="flex gap-3 items-center p-3">
                <h3 className="flex gap-[1px] text-muted-foreground">
                  <span>{mc[i]}</span>
                  <span>{`)`}</span>
                </h3>
                <h3>{question.options[index]} </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
