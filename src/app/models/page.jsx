"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ModelCard from "@/components/ModelCard/ModelCard";
// import json from "@p/models.json";
export default function Page() {
  // по умолчанию передаём пустой массив!
  const [dataResponse, setDataResponse] = useState([]);
  useEffect(() => {
    const getPageData = async () => {
      const apiUrlEndpoint = `/api/getdata?type=selectAll`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      console.log(results);
      setDataResponse(results);
    };

    getPageData();
  }, []);
  return (
    <>
      <h1>MODELS</h1>
      <div className={styles.modelcard_wrapper}>
        {dataResponse.map((el) => {
          return (
            <ModelCard
              key={el.id}
              id={el.id}
              name={el.name}
              imgSrc={el.id}
            ></ModelCard>
          );
        })}
      </div>
    </>
  );
}
