"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AdminMaBtn } from "@/components/AdminMaBtn";

import Notification from "@/components/Notification/Notification";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  if (error) return <>{error.message}</>;
  if (isLoading)
    return (
      <div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Loading...
      </div>
    );
  if (user) {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        {children}
        <AdminMaBtn isLogged={user} />
      </div>
    );
  }
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <AdminMaBtn isLogged={user} />
    </div>
  );
}
