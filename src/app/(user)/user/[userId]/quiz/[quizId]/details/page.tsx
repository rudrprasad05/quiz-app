import { GetCurrentUserOnly } from "@/actions/user";
import Title from "@/components/global/Title";
import React from "react";
import DetailsView from "./_components/DetailsView";
import { GetQuizWithAttempts } from "@/actions/quiz";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

type PageProps = {
  params: { quizId: string; userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const user = await GetCurrentUserOnly();
  const quiz = await GetQuizWithAttempts(props.params.quizId);

  if (!quiz || !user) return null;
  const myAttempts = quiz?.attempts.filter(
    (i) => i.userId == props.params.userId
  );

  return (
    <div className="p-12">
      <div className="flex gap-6 items-center">
        <Title title={"Quiz Details"} user={user} />
        {myAttempts.length < quiz.maxAttempts && (
          <Link
            href={`/user/${user.id}/quiz/${quiz.id}/attempt`}
            className={buttonVariants({ variant: "default" })}
          >
            Attempt
          </Link>
        )}

        {myAttempts.length >= quiz.maxAttempts && (
          <Button disabled>Attempt</Button>
        )}
      </div>

      <DetailsView quiz={quiz} />
    </div>
  );
};

export default page;
