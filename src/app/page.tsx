"use client"

import { Hero } from "@/components/ui/home/Hero";
import { Navbar } from "@/components/elements/Navbar";
import { Footer } from "@/components/elements/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {

  const { user } = useAuth();

  console.log(user?.idToken)

  return (
    <>
      <Navbar/>
      <main className="h-screen">
        <Hero/>
      </main>
      <Footer/>
    </>
  );
}
