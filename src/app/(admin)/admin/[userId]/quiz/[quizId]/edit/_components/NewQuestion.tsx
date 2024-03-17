"use client";

import { Button } from "@/components/ui/button";
import { QuesitonContext } from "@/context/QuesitonContext";
import { QuestionType } from "@/types";
import React, { useContext } from "react";

const NewQuestion = () => {
  const { questions, addQuestion } = useContext(QuesitonContext);

  const onClickAdd = () => {
    addQuestion();
  };

  return (
    <Button className="w-full" onClick={onClickAdd}>
      Add Questions
    </Button>
  );
};

export default NewQuestion;
