import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingBackground from "@/components/FloatingBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Certifications from "@/components/Certifications";
import Academy from "@/components/Academy";
import Photography from "@/components/Photography";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-[2]">
      <Cursor />
      <ScrollProgress />
      <FloatingBackground />
      <Nav />
      <Hero />
      <About />
      <Toolkit />
      <Experience />
      <Projects />
      <Research />
      <Certifications />
      <Academy />
      <Photography />
      <Contact />
      <Footer />
    </main>
  );
}
