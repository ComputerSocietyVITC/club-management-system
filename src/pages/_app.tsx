import { type AppType } from "next/dist/shared/lib/utils";
import "@cms/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
