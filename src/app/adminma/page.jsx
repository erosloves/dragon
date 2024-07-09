"use client";
import style from "./page.module.css";
import { useRef, useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { motion, AnimatePresence } from "framer-motion";

import Layout from "./layout";
import Link from "next/link";
import { AdminMaBtn } from "@/components/AdminMaBtn";
import Notification from "@/components/Notification/Notification";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function AdminPage({}) {
  const { user, error, isLoading } = useUser();
  const currentPath = usePathname();

  // notification
  const [notifyVisible, setNotifyVisible] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifyVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [notifyVisible]);

  if (error) return <>{error.message}</>;
  if (isLoading) return <>Loading...</>;

  if (user) {
    return (
      <>
        <Layout>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "30px",
            }}
          >
            <h2>{user.name}, welcome to admin panel</h2>
            <Link href={currentPath + "/createModel"}>Create a model</Link>
            <Link href={currentPath + "/editModel"}>Edit a model</Link>
          </div>
          <AdminMaBtn isLogged={user} />
        </Layout>
      </>
    );
  }
  return <AdminMaBtn isLogged={user} />;
}

{
  /* 
        <AnimatePresence>
          {notifyVisible && (
            <Notification
              key="child"
              isVisible={notifyVisible}
              notifyData={notifyMsg}
            />
          )}
        </AnimatePresence>
        */
}
