import ReloopHero from "../components/landing/ReloopHero";
import { HowReloopWorks, RoleFunnel, LandingFinalCTA } from "../components/landing/story";
import { StatRibbon, DiagonalMarquee, TestimonialBento } from "./landing/sections";

export default function Landing() {
  return (
    <>
      <ReloopHero />
      <StatRibbon />
      <DiagonalMarquee />
      <RoleFunnel />
      <HowReloopWorks />
      <TestimonialBento />
      <LandingFinalCTA />
    </>
  );
}
