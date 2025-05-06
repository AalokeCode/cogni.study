'use client';
import Image from "next/image";
import { ReactLenis, useLenis } from 'lenis/react'
import Header from "@/components/sections/Home/header";
import MainFeatureSection from "@/components/sections/Home/mainFeature";
import Footer from "@/components/sections/Home/footer";

export default function Home() {
  const lenis = useLenis(({ scroll }) => {})
  return (
    <ReactLenis root>
    <Header></Header>
    <MainFeatureSection></MainFeatureSection>
    <Footer></Footer>
    </ReactLenis>
  );
}
