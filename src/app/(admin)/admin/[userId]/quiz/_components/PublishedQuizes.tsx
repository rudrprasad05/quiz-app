"use client";

import { Magnet, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormCard } from "./FormCard";
import { Input } from "@/components/ui/input";
import { GetAllQuizeForOneUnitType } from "@/types";

interface props {
  data: GetAllQuizeForOneUnitType;
}

const PublishedQuizes: React.FC<props> = ({ data }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="pb-20">
      <div className="pb-10 flex items-center">
        <h1 className="grow text-xl text-primary font-semibold ">Published</h1>
        <div className="relative">
          <Input
            value={search}
            placeholder="Search..."
            // className={InputClass}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Search />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data?.map((i) => {
          if (i.isPublished) {
            if (i.topic.toLowerCase().includes(search.toLowerCase())) {
              return <FormCard key={i.id} form={i} />;
            }
          }
        })}
        {data?.length == 0 && <>No reulsts</>}
      </div>
    </div>
  );
};

export default PublishedQuizes;
