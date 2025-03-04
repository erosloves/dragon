"use client";
import { AdminMaBtn } from "@/components/AdminMaBtn";
import { NavBtn } from "@/components/AdminMaBtn";
import Notification from "@/components/Notification/Notification";
import {
  NotificationContextProvider,
  NotificationContext,
} from "@/contexts/notification";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { setNotifyVisible, setNotifyData } = useContext(NotificationContext);

  const sendLoginData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка авторизации");
      }

      setNotifyData({ text: data.message, status: data.status });
      setNotifyVisible(true);

      router.push("/adminma");
    } catch (error) {
      const errorMessage = error.message || "Неизвестная ошибка";
      setNotifyData({ text: errorMessage, status: "error" });
      setNotifyVisible(true);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Please, login</h2>
      <form onSubmit={sendLoginData}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Login</label>
          <input
            type="text"
            className={styles.formControl}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            type="password"
            className={styles.formControl}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <AdminMaBtn text={"Login"} type={"submit"} />
      </form>
    </div>
  );
}
