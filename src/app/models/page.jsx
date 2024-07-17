"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./page.module.css";
import ModelCard from "@/components/ModelCard";
import { AnimatePresence, motion } from "framer-motion";

import GoToUp from "@/components/GoToUp";

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
      const apiUrlEndpoint = `/api/client/getdata?type=selectAll`;
      await fetch(apiUrlEndpoint, {
        method: "GET",
        headers: {
          Authorization: process.env.API_AUTH_TOKEN,
        },
      })
        .then((response) => response.json())
        .then((json) => setDataResponse(json.results));
    };

    getPageData();
  }, []);

  return (
    <AnimatePresence>
      <div className={styles.modelcard_wrapper}>
        {dataResponse.map((el, i) => {
          return (
            <motion.div
              key={i}
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
                countModels={dataResponse.length}
              />
            </motion.div>
          );
        })}
      </div>
      <GoToUp key={`GoToUp`} />
    </AnimatePresence>
  );
}
