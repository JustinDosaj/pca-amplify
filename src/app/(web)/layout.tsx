import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import { Navbar } from "@/components/elements/Navbar";
import { Footer } from "@/components/elements/Footer";

export default function WebLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main>
        <Navbar/>
        {children}
        <Footer/>
    </main>
  );
}
