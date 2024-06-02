import AuthButton from "@/components/auth-forms/auth-button";
import SignInForm from "@/components/auth-forms/sign-in-form";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await getServerAuthSession();
  if (session?.user) redirect("/");
  return (
    <>
      <div className="max-w-6/12 fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex min-h-full w-[250px] flex-col items-center justify-between gap-3 tracking-tighter 2xl:w-[300px]">
          <div className="flex w-full flex-col items-center">
            <h5 className="mb-3 text-3xl font-semibold">Welcome Back</h5>
            <SignInForm />
            {/* <AuthButton provider="google" className="mb-2 w-full" /> */}
            <AuthButton provider="github" className="w-full" />
          </div>
          <div className="w-full">
            <Separator />
            <div className="mt-2 flex w-full justify-between text-xs text-slate-500 transition-all">
              <Link href="/about" className="hover:border-b">
                About us
              </Link>
              <Link href="/privacy" className="hover:border-b">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-[20px] -right-[30px] -z-10 h-[80px] w-[80px] rounded-full bg-slate-200 max-sm:-bottom-[260px]"></div>
        <div className="absolute -top-1/2 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-slate-200 2xl:-right-[150px]"></div>
      </div>
    </>
  );
};

export default LoginPage;
