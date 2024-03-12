import { UserType } from "@/types";
import React from "react";
import EditProfileSheet from "../nav/EditProfileSheet";
import AvatarComponent from "../nav/AvatarComponent";
import { LucideIcon } from "lucide-react";

const Title = ({
  user,
  title,
  children,
}: {
  user?: UserType | null;
  title: string;
  children?: React.ReactElement;
}) => {
  return (
    <div className="flex justify-between items-center px-5 py-3 bg-secondary rounded-md w-full">
      <div>
        {children}
        <h1 className="text-xl">{title}</h1>
      </div>
      {user && (
        <EditProfileSheet user={user}>
          <AvatarComponent
            fallback={user.name?.slice(0, 2).toUpperCase() || "AD"}
            src={user?.image}
          />
        </EditProfileSheet>
      )}
    </div>
  );
};

export default Title;
