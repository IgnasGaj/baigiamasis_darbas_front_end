import React from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <LoginForm />
      <Link href="/register">Register here</Link>
    </div>
  );
};

export default index;
