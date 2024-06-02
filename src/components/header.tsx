"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-secondary px-10 py-5">
      <span className="text-2xl font-semibold">UnstudioAI</span>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
    </div>
  );
};

export default Header;
