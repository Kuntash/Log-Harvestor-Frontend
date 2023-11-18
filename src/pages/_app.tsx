import { type AppType } from "next/dist/shared/lib/utils";
import { inter } from "@main/fonts";
import "@main/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@main/globalState/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@main/components/ui/toaster";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <ClerkProvider {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ClerkProvider>
    </div>
  );
};

export default MyApp;
