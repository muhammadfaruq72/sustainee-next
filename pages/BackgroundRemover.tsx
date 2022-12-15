import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import WorkingApp from "../components/sections/BGApp/BGApp";
import { WorkingAppProvider } from "../components/sections/BGApp/BGApp_";

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
