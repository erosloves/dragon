"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import css from "./page.module.css";
export default function Home() {
  return (
    <motion.div initial={{ y: -100 }} className={css.container}>
      <div className={css.layout}>
        <Link href="/models">models</Link>
        <Link href="/contacts">contacts</Link>
        <Link href="https://t.me/thedragonmm_bot">become a model</Link>
      </div>
      <motion.video
        className={css.video}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        src="IMG_4966.mp4"
        autoPlay
        muted
        loop
      />
    </motion.div>
  );
}
