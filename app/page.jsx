import About from "./components/About";
import Cocktails from "./components/Cocktails";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="scrollbar-hidden">
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
    </main>
  );
}
