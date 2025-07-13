import React from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";

const index = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <LoginForm />
      <Link
        href="/register"
        style={{
          marginTop: "1rem",
          fontSize: "14px",
          color: "#0070f3",
          textDecoration: "underline",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        Don’t have an account? <strong>REGISTER HERE!</strong>
      </Link>
    </div>
  );
};

export default index;
