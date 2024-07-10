"use client";
import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Spin } from "antd";

const variantsAnimateParams = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2 },
  }),
};

export default function Page({ params }) {
  const [modelData, setModelData] = useState([]);
  const [slideImage, setSlideImage] = useState([]);
  const [currentId, setCurrentId] = useState(params.id);
  const [isLoading, setLoading] = useState(true);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [modelsCount, setCount] = useState(null);
  const [slideCount, setSlideCount] = useState(0);
  const [slidesToMap, setSlidesToMap] = useState(slideImage);

  useEffect(() => {
    const getModel = async () => {
      const apiUrlEndpoint = `/api/getdata?type=selectById&id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setModelData(results[0]);
      setDataIsLoaded(true);
    };
    const getImage = async () => {
      const apiUrlEndpoint = `/api/images?id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setSlideImage(results);
    };
    const getPageData = async () => {
      const apiUrlEndpoint = `/api/getdata?type=lastId`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setCount(results[0].lastId);
    };

    getModel();
    getImage();
    getPageData();
  }, [params.id]);

  useEffect(() => {
    setSlidesToMap(slideImage.slice(slideCount));
  }, [slideCount, slideImage]);

  return (
    <VerticalSplitScreen
      slideCount={slideCount}
      setSlideCount={setSlideCount}
      slideImageLength={slideImage.length}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        <AnimatePresence>
          {dataIsLoaded && (
            <motion.div
              initial="hidden"
              animate="visible"
              className={styles.params}
            >
              <motion.h2
                variants={variantsAnimateParams}
                custom={1}
                className={styles.paramType}
              >
                {modelData.name}
              </motion.h2>
              <motion.div
                variants={variantsAnimateParams}
                custom={2}
                className={styles.paramType}
              >
                height:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.height}cm
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={3}
                className={styles.paramType}
              >
                bust:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.bust}cm
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={4}
                className={styles.paramType}
              >
                waist:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.waist}cm
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={5}
                className={styles.paramType}
              >
                hip:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.hip}cm
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={6}
                className={styles.paramType}
              >
                shoes:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.shoes}eu
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={7}
                className={styles.paramType}
              >
                eyes:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.eyes}
                </span>
              </motion.div>
              <motion.div
                variants={variantsAnimateParams}
                custom={8}
                className={styles.paramType}
              >
                hair:
                <span className={styles.paramValue}>
                  &nbsp;{modelData.hair}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.imgContainer}>
          {dataIsLoaded && (
            <AnimatePresence mode="wait">
              {slidesToMap.map((img) => {
                return (
                  <motion.img
                    key={img}
                    className={styles.img}
                    src={img}
                    alt={img}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </VerticalSplitScreen>
  );
}

const VerticalSplitScreen = ({
  children,
  slideCount,
  setSlideCount,
  slideImageLength,
}) => {
  const [isLeftSide, setIsLeftSide] = useState(true);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const screenWidth = window.innerWidth;
      const cursorX = e.clientX;

      // Устанавливаем состояние в зависимости от положения курсора
      if (cursorX < screenWidth / 2) {
        setIsLeftSide(true);
      } else {
        setIsLeftSide(false);
      }
    };

    // Добавляем обработчик события mousemove
    window.addEventListener("mousemove", handleMouseMove);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const chacngeSlide = () => {
    if (isLeftSide) {
      if (slideCount > 0) setSlideCount(slideCount - 2);
    } else if (slideCount < slideImageLength - 2) setSlideCount(slideCount + 2);
  };
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: "100px",
        width: "100%",
        height: "calc(100vh - 100px)",
        // backgroundColor: "#aa999945",
        cursor: "none",
      }}
      onClick={() => chacngeSlide()}
    >
      <CustomCursor isLeftSide={isLeftSide} />
      {children}
    </div>
  );
};

const CustomCursor = ({ isLeftSide }) => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };
    console.log(cursor.style.left);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor">
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke="#5c5c5cd4"
            stroke-width="1"
            fill="#9d9d9d6b"
          />

          <polyline
            points="30,15 20,25 30,35"
            stroke="black"
            stroke-width="2"
            fill="none"
            transform={isLeftSide ? 0 : "translate(50, 0) scale(-1, 1)"}
          />
        </svg>
      </div>
    </>
  );
};
