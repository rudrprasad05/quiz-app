import React from "react";
import LoginForm, { SignInForm } from "./_components/LoginForm";

type Props = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = (props: Props) => {
  return (
    <div className="py-12">
      <LoginForm />
    </div>
  );
};

export default page;
