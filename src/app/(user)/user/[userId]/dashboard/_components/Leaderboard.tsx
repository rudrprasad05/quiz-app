import { GetUsersWithAttemptsType } from "@/types";
import React from "react";

const Leaderboard = ({ user }: { user: GetUsersWithAttemptsType }) => {
  if (!user) return null;

  return <div>Leaderboard</div>;
};

export default Leaderboard;
