'use client';
import Image from "next/image";
import { ReactLenis, useLenis } from 'lenis/react'
import Header from "@/components/sections/Home/header";
import MainFeatureSection from "@/components/sections/Home/mainFeature";

export default function Home() {
  const lenis = useLenis(({ scroll }) => {})
  return (
    <ReactLenis root>
    <Header></Header>
    <MainFeatureSection></MainFeatureSection>

    </ReactLenis>
  );
}
