"use client";
import { useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AdminMaBtn } from "@/components/AdminMaBtn";
import { NavBtn } from "@/components/AdminMaBtn";
import Notification from "@/components/Notification/Notification";
import { NotificationContextProvider } from "@/contexts/notification";
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
        <NotificationContextProvider>
          <Notification />
          {children}
          <AdminMaBtn isLogged={true} />
          <NavBtn />
        </NotificationContextProvider>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <AdminMaBtn isLogged={false} />
    </div>
  );
}
