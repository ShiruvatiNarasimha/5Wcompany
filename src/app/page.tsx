import { Approach } from "@/components/approach";
import { Brief } from "@/components/brief";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { Navbar } from "@/components/navbar";
import { Principles } from "@/components/principles";

// The page reads as one argument, in order:
// what 5W is → the problem → the method → the principles → the artifact → next step.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Approach />
        <Method />
        <Principles />
        <Brief />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
