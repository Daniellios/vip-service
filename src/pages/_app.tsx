import { type AppType } from "next/dist/shared/lib/utils";
import store from "../store/flightStore";
import "../styles/globals.css";
import Layout from "./layouts/layout";
import { Provider } from "react-redux";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
