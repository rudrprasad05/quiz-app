import { QuizType } from "@/types";
import React from "react";
import BuilderNav from "./BuilderNav";

const QuizBuilder = ({ quiz }: { quiz: QuizType }) => {
  return (
    <div>
      <BuilderNav quiz={quiz} />
    </div>
  );
};

export default QuizBuilder;
