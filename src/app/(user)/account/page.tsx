
"use client"

import { Header } from "@/components/elements/Header";
import { Footer } from "@/components/elements/Footer";
import { useAuth } from "@/hooks/auth.hook";

export default function Home() {

  const { logout } = useAuth();

  return (
    <>
      <Header/>
      <main className="h-screen mx-auto my-auto grid">
        <button onClick={logout}>Logout</button>
      </main>
      <Footer/>
    </>
  );
}
