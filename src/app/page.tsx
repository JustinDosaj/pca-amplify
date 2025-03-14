import { Hero } from "@/components/ui/home/Hero";
import { Header } from "@/components/elements/Header";
import { Footer } from "@/components/elements/Footer";

export default function Home() {

  return (
    <>
      <Header/>
      <main className="h-screen">
        <Hero/>
      </main>
      <Footer/>
    </>
  );
}
