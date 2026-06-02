import Sidebar from '@/components/Navbar';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import PrintLayout from "@/components/PrintLayout";

export default function Home() {
  return (
    <>
      {/* Web Layout */}
      <main className="min-h-screen print:hidden">
      <Sidebar />
      <Hero />
      <About />
      {/* <Skills /> - Merged into Projects */}
      <Projects />
      <Experience />
      <Footer />
      </main>
      
      {/* Print Only Layout */}
      <PrintLayout />
    </>
  );
}
