import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { Toaster } from "react-hot-toast";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} /> <Toaster />
      </Layout>
    </Provider>
  );
}
