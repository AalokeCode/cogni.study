"use client";
import Header from "@/components/sections/Home/header";
import FeaturesSection from "@/components/sections/Home/features";
import MainFeatureSection from "@/components/sections/Home/mainFeature";
import Footer from "@/components/elements/footer";

export default function Home() {
  return (
    <>
      <Header />
      <MainFeatureSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}
