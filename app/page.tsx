import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhoIsItFor from "@/components/landing/WhoIsItFor";
import Features from "@/components/landing/Features";
import LandingCTA from "@/components/landing/LandingCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <WhoIsItFor />
        <div id="features">
          <Features />
        </div>
        <LandingCTA />

        <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Interview Prep AI. Built to help you succeed.</p>
        </footer>
      </main>
    </>
  );
}
