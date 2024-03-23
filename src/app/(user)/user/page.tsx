import { GetCurrentUserOnly } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await GetCurrentUserOnly();
  if (!user) return redirect("/");
  redirect(`/user/${user.id}/dashboard`);
};

export default page;
