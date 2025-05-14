/*TODO: Delete this page once logout is implemented into dashboard layout and navbar */

"use client"

import { useAuth } from "@/hooks/useAuth";

export default function Account() {

  const { logout } = useAuth();

  return (
    <>
      <main className="h-screen mx-auto my-auto grid">
        <button onClick={logout}>Logout</button>
      </main>
    </>
  );
}
