import Layout from "../src/components/Layout";
import "../styles/globals.css";
import { MainProvider } from "../context/mainContext";

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainProvider>
  );
}

export default MyApp;
