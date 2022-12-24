import Head from "next/head";
import styles from "../styles/Home.module.css";
import IntroSection from "../components/sections/IntroSections/IntroSections";
import Header from "../components/header/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sustainee</title>
        <meta name="description" content="AI tools to enhance productivity" />
        <link rel="icon" href="/sustainee.ico" />
      </Head>

      <Header />
      <IntroSection />
      <Footer />
    </>
  );
}
