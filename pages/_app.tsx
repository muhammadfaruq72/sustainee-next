import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { AuthProvider } from "../components/sections/Global/login_AuthContext";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics measurementId="G-3W6Q0V546N" />
      <ApolloProvider client={client}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
