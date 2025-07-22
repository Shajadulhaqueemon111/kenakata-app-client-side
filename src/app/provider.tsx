// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./authcontext/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </AuthProvider>
  );
}
