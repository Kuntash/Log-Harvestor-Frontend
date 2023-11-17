import { type AppType } from "next/dist/shared/lib/utils";
import { inter } from "@main/fonts";
import "@main/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
};

export default MyApp;
