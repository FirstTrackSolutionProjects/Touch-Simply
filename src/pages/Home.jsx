import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import TemplatesPreview from "../components/TemplatesPreview";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <div>
        <Hero />
        <Stats />
        <Features />
        <TemplatesPreview />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <CTA />
    </div>
  );
};

export default Home;