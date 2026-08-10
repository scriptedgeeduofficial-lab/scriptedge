import Services from "./components/home/Services";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import WhyChoose from "./components/home/WhyChoose";

import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";
import FAQ from "./components/home/FAQ";
import Contact from "./components/home/Contact";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Services />
      <WhyChoose />
      
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}