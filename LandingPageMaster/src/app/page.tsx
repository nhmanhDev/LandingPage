import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Ecosystem } from "@/components/Ecosystem";
import { Projects } from "@/components/Projects";
import { Vision } from "@/components/Vision";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#070710", color: "#fff" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Ecosystem />
        <Projects />
        <Vision />
        <Contact />
      </main>
    </div>
  );
}
