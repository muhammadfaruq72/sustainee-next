import Head from "next/head";
import styles from "../styles/Home.module.css";
import IntroSection from "../components/sections/InstroSections";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <IntroSection />
      <Footer />
    </>
  );
}
