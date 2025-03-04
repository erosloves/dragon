"use client";

import Notification from "@/components/Notification/Notification";
import { NotificationContextProvider } from "@/contexts/notification";

export default function Layout({ children }) {
  return (
    <NotificationContextProvider>
      <Notification />
      {children}
    </NotificationContextProvider>
  );
}
