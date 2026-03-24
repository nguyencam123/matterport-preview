import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TourSection from "@/components/TourSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen">
      <Navbar />
      {/* <Hero /> */}
      <TourSection />
      {/* <AmenitiesSection />
      <ContactSection /> */}
      <Footer />
    </div>
  );
}
