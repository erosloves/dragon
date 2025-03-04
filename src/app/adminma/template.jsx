"use client";

import { AdminMaBtn, NavBtn } from "@/components/AdminMaBtn";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { NotificationContext } from "@/contexts/notification";
import { useContext } from "react";

import css from "./page.module.css";

export default function Transition({ children }) {
  const templateVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={usePathname}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={templateVariants}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {children}
        <BtnWrapper />
      </motion.div>
    </AnimatePresence>
  );
}

const BtnWrapper = () => {
  const router = useRouter();

  const { setNotifyVisible, setNotifyData } = useContext(NotificationContext);

  const handleLogout = async () => {
    await fetch("/api/auth/logout")
      .then((response) => response.json())
      .then((data) => {
        setNotifyVisible(true),
          setNotifyData({ text: data.message, status: "ok" });
      })
      .then(() => {
        router.push("/adminma/login");
      });
  };

  const pathname = usePathname();
  if (pathname.includes("/login")) {
    return null;
  }

  return (
    <div className={css.btnWrapper}>
      <AdminMaBtn text={"Logout"} onClick={handleLogout} />
      <NavBtn />
    </div>
  );
};
