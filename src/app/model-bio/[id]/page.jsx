"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isLoading, setLoading] = useState(true);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [slideCount, setSlideCount] = useState(0);
  // const [slidesToRender, setSlidesToRender] = useState(slideImage);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    getModel();
    getImage();
  }, [params.id]);

  useEffect(() => {
    setCurrentSlide(slideCount / 2);
  }, [slideCount, slideImage, setCurrentSlide]);

  return (
    <>
      <VerticalSplitScreen
        slideCount={slideCount}
        setSlideCount={setSlideCount}
        slideImageLength={slideImage.length}
      />
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

        <AnimatePresence>
          <div className={styles.imgContainer}>
            {slideImage.map((img, i) => {
              return (
                <motion.figure
                  key={img}
                  className={styles.imgWrapper}
                  style={{
                    transform: `translateX(calc(-${slideCount * 200}% - ${
                      slideCount * 10
                    }px))`,
                  }}
                >
                  <motion.img
                    src={img}
                    alt={img}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className={styles.img}
                    onLoad={() => setLoading(false)}
                  />
                </motion.figure>
              );
            })}
          </div>
        </AnimatePresence>
      </motion.div>
    </>
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
      if (slideCount > 0) setSlideCount(slideCount - 1);
    } else if (!isLeftSide) {
      if (slideCount < slideImageLength / 2 - 1) setSlideCount(slideCount + 1);
    }
  };

  return (
    <div onClick={() => chacngeSlide()} className={styles.VerticalSplitScreen}>
      <CustomCursor
        isLeftSide={isLeftSide}
        slideCount={slideCount}
        slideImageLength={slideImageLength}
      />
      {children}
    </div>
  );
};

const CustomCursor = ({ isLeftSide, slideCount, slideImageLength }) => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const polylineStroke = () => {
    if (isLeftSide) {
      if (slideCount == 0) {
        return "#9d9d9d6b";
      } else return "#111";
    } else if (!isLeftSide) {
      if (slideCount < slideImageLength / 2 - 1) {
        return "#111";
      } else return "#9d9d9d6b";
    }
  };
  const circletroke = () => {
    if (isLeftSide) {
      if (slideCount == 0) {
        return "#9d9d9d6b";
      } else return "#111";
    } else if (!isLeftSide) {
      if (slideCount < slideImageLength / 2 - 1) {
        return "#111";
      } else return "#9d9d9d6b";
    }
  };

  return (
    <>
      <div id="custom-cursor">
        <svg
          width="50"
          height="50"
          xmlns="http://www.w3.org/2000/svg"
          transform={isLeftSide ? "scale(1, 1)" : " scale(-1, 1)"}
        >
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke={circletroke()}
            strokeWidth="2"
            fill="#9d9d9d6b"
          />

          <polyline
            points="30,15 20,25 30,35"
            stroke={polylineStroke()}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </>
  );
};
