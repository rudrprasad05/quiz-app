import { Loader2 } from "lucide-react";
import React from "react";

const Pageloader = () => {
  return (
    <div className="p-12 grow flex items-center justify-center w-screen h-screen">
      <Loader2 className="animate-spin h-12 w-12" />
    </div>
  );
};

export default Pageloader;
