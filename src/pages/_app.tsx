import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@cms/apollo/client";
import "@cms/styles/globals.css";
import { type AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  // @ts-ignore
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
