"use client"

import { Hero } from "@/components/ui/home/Hero";
import { Header } from "@/components/elements/Header";
import { Footer } from "@/components/elements/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {

  const { user } = useAuth();

  console.log(user?.idToken)

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
