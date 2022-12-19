import React from "react";
import Footer from "../components/footer";
import Header from "../components/header/header";
import Upscaler from "../components/sections/UpscalerApp/Upscaler";
import { UpscalerProvider } from "../components/sections/UpscalerApp/Upscaler_";

export default function BackgroundRemover() {
  return (
    <>
      <Header />
      <UpscalerProvider>
        <Upscaler />
      </UpscalerProvider>
      <Footer />
    </>
  );
}
