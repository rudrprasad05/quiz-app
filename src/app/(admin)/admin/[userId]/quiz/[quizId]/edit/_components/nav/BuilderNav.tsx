"use client";
import { Button } from "@/components/ui/button";
import { QuizType } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import { QuesitonContext } from "@/context/QuesitonContext";

const BuilderNav = ({ quiz }: { quiz: QuizType }) => {
  const router = useRouter();
  const { initQuestions } = useContext(QuesitonContext);

  // initQuestions();
  useMemo(() => {
    initQuestions();
  }, []);

  return (
    <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
      <div className="flex gap-5 items-center">
        <Button
          variant={"link"}
          className="p-0"
          onClick={() => router.replace("/admin")}
        >
          <ArrowLeft className={"w-6 h-6 stroke-primary mr-3"} />
          Back Home
        </Button>
        {/* <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Post:</span>
          {form.name}
        </h2>
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Category:</span>
          {form.tags}
        </h2> */}
      </div>

      <div className="flex items-center gap-2">
        <PreviewDialogBtn />
        {!quiz.isPublished && (
          <>
            <SaveFormBtn id={quiz.id} />
            <PublishFormBtn id={quiz.id} />
          </>
        )}
      </div>
    </nav>
  );
};

export default BuilderNav;
