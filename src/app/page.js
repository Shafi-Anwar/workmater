// app/page.js (or another Client Component where you want to use `useSession`)
"use client";

import ClientProvider from "@/components/ClientProvider"; // Adjust path as needed
import Header from "@/components/Header";

export default function Page() {
  return (
    <ClientProvider>
      <Header />
      {/* other components that need Client-side features */}
    </ClientProvider>
  );
}
