import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UnitsOnlyType } from "@/types";
import React from "react";

const CurrentUnits = ({ units }: { units: UnitsOnlyType[] }) => {
  return (
    <div>
      {units.map((unit) => (
        <Card key={unit.id}>
          <CardHeader>
            <CardTitle>{unit.code}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CurrentUnits;
