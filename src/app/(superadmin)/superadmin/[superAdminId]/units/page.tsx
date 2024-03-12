import { GetCurrentUserOnlyById } from "@/actions/user";
import Title from "@/components/global/Title";
import { PageProps } from "@/types";
import React, { Suspense } from "react";
import NewUnitButton from "./_components/NewUnitButton";
import { GetAllUnitsOnly } from "@/actions/unit";
import Loading from "./loading";
import CurrentUnits from "./_components/CurrentUnits";

const page = async (props: PageProps) => {
  const user = await GetCurrentUserOnlyById(props.params.superAdminId);
  if (!user) return null;
  const units = await GetAllUnitsOnly();
  return (
    <section className="w-full ">
      <Title title="Units" user={user} />
      <div className="grid grid-cols-4 py-8">
        <NewUnitButton user={user} />
      </div>
      {!units ? <Loading /> : <CurrentUnits units={units} />}
    </section>
  );
};

export default page;
