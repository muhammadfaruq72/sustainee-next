import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import WorkingApp from "../components/sections/appIntro/WorkingApp";
import { WorkingAppProvider } from "../components/sections/appIntro/WorkingApp_one";

export default function BackgroundRemover() {
  return (
    <>
      <Header />
      <WorkingAppProvider>
        <WorkingApp />
      </WorkingAppProvider>
      <Footer />
    </>
  );
}
