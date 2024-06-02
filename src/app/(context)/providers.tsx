"use client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { type PropsWithChildren } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { customFileRouter } from "../api/uploadthing/core";

const Providers = (props: PropsWithChildren) => {
  const queryClient = new QueryClient();
  //   const session = useSession();
  return (
    <SessionProvider>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(customFileRouter)}
      />
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
      <Toaster />
    </SessionProvider>
  );
};

export default Providers;
