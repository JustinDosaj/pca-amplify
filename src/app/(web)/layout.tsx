import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import { Header } from "@/components/elements/Header";
import { Footer } from "@/components/elements/Footer";

export default function WebLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main>
        <Header/>
        {children}
        <Footer/>
    </main>
  );
}
