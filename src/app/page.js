import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Reel from "../components/Reel";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Reel />
      <About />
      <Contact />
    </main>
  );
}