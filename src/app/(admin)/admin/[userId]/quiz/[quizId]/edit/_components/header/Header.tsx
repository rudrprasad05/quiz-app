import { QuizType } from "@/types";
import React from "react";

const Header = ({ quiz }: { quiz: QuizType }) => {
  return (
    <div>
      <h1>{quiz.topic}</h1>
    </div>
  );
};

export default Header;
