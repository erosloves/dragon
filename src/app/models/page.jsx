"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./page.module.css";
import ModelCard from "@/components/ModelCard";
import { motion } from "framer-motion";

const cardAnimation = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export default function Page() {
  // по умолчанию передаём пустой массив!
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    const getPageData = async () => {
      const apiUrlEndpoint = `/api/getdata?type=selectAll`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setDataResponse(results);
    };

    getPageData();
  }, []);

  return (
    <>
      <motion.h1
        animate={{ height: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        MODELS
      </motion.h1>
      <motion.div className={styles.modelcard_wrapper}>
        {dataResponse.map((el, i) => {
          return (
            <motion.div
              key={el.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={cardAnimation}
              custom={i++}
              style={{ width: "100%" }}
            >
              <ModelCard
                id={el.id}
                name={el.name}
                imgSrc={el.id}
                countModels={dataResponse.length}
              ></ModelCard>
            </motion.div>
          );
        })}
      </motion.div>
      <GoToUp />
    </>
  );
}

const GoToUp = () => {
  const [isVisible, setIsVisible] = useState("hidden");

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const screenHeight = document.documentElement.scrollHeight / 2;
    if (scrolled > screenHeight) {
      setIsVisible("visible");
    } else {
      setIsVisible("hidden");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log(document.documentElement.scrollTop);
    console.log(document.documentElement.scrollHeight / 3);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        transform: "rotate(90deg)",
        cursor: "pointer",
        visibility: isVisible,
      }}
      onClick={scrollToTop}
    >
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="25"
          cy="25"
          r="24"
          stroke="#9d9d9d6b"
          stroke-width="2"
          fill="#9d9d9d6b"
        />

        <polyline
          points="30,15 20,25 30,35"
          stroke="#9d9d9d6b"
          stroke-width="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
