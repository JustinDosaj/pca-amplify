import { ConversationsProvider } from "@/providers/conversations.providers";
import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'

export default function WebLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main>
        <ConversationsProvider>
            {children}
        </ConversationsProvider>
    </main>
  );
}
