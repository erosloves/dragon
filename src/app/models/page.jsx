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
      <h1>MODELS</h1>
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
    </>
  );
}
