import { GetCurrentUserOnly, GetCurrentUserOnlyById } from "@/actions/user";
import { PageProps } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

const page = async (props: PageProps) => {
  const user = await GetCurrentUserOnlyById(props.params.userId);
  if (!user) return notFound();
  return <div>page</div>;
};

export default page;
