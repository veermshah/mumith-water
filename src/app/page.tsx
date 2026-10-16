import { ThreeLoader } from "@/components/bottle/three-loader";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { GetInvolved } from "@/components/sections/get-involved";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Materials } from "@/components/sections/materials";
import { Problem } from "@/components/sections/problem";
import { Sponsors } from "@/components/sections/sponsors";
import { Water } from "@/components/sections/water";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Sponsors />
        <Materials />
        <Water />
        <GetInvolved />
        <Faq />
      </main>
      <Footer />
      <ThreeLoader />
    </>
  );
}
