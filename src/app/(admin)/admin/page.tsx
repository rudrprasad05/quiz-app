import { GetCurrentUserOnly } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await GetCurrentUserOnly();
  if (!user) return redirect("/");
  redirect(`/admin/${user.id}/dashboard`);
};

export default page;
