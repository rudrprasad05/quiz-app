import { PageProps } from "@/types";
import React from "react";

import CurrentQuizes from "./_components/CurrentQuizes";

const page = async (props: PageProps) => {
  const userId = props.params.userId;

  return (
    <div className="p-12 grow w-full">
      <CurrentQuizes userId={userId} />
    </div>
  );
};

export default page;
