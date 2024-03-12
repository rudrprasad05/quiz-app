import { GetCurrentUserOnly } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await GetCurrentUserOnly();
  if (!user) redirect("/");
  if (user.role == "ADMIN") redirect(`/superadmin/${user.id}/dashboard`);
  if (user.role == "LEADER") redirect(`/admin/${user.id}/dashboard`);
  redirect("/");
};

export default page;
