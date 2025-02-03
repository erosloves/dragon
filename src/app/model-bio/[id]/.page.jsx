"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import useViewPortWidth from "@/hooks/useViewPortWidth";
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
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [slideCount, setSlideCount] = useState(0);
  const [isCCVisible, setCCVisible] = useState(false);

  useEffect(() => {
    const getModel = async () => {
      const apiUrlEndpoint = `/api/client/getdata?type=selectById&id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setModelData(results[0]);
      setDataIsLoaded(true);
    };

    getModel();
  }, [params.id]);

  useEffect(() => {
    const getImage = async () => {
      try {
        const apiUrlEndpoint = `/api/client/getimages?id=${params.id}`;
        const req = await fetch(apiUrlEndpoint);

        if (!req.ok) {
          throw new Error("Network response was not ok");
        }

        const { results } = await req.json();
        setSlideImage(results);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    getImage();
  }, [params.id]);

  const titleImg = slideImage.filter((el) => {
    if (el.slice(-9).toLowerCase() == "title.jpg") {
      return el;
    }
  });

  return (
    <>
      <section className={styles.titleSection}>
        <motion.img src={titleImg} />

        <motion.h2
          variants={variantsAnimateParams}
          custom={1}
          className={styles.paramType}
        >
          {modelData.name}
        </motion.h2>
      </section>
      <VerticalSplitScreen
        slideCount={slideCount}
        setSlideCount={setSlideCount}
        slideImageLength={slideImage.length}
        setCCVisible={setCCVisible}
        isCCVisible={isCCVisible}
      >
        <AnimatePresence>
          <div className={styles.imgContainer}>
            {slideImage.map((img) => {
              if (img.slice(-9).toLowerCase() == "title.jpg") {
                return;
              } else
                return (
                  <motion.figure
                    key={img}
                    className={styles.imgWrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                      transition={{ duration: 1 }}
                      className={styles.img}
                    />
                  </motion.figure>
                );
            })}
          </div>
        </AnimatePresence>
      </VerticalSplitScreen>

      <AnimatePresence>
        {dataIsLoaded && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            className={styles.params}
          >
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
              hips:
              <span className={styles.paramValue}>&nbsp;{modelData.hip}cm</span>
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
              <span className={styles.paramValue}>&nbsp;{modelData.eyes}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={8}
              className={styles.paramType}
            >
              hair:
              <span className={styles.paramValue}>&nbsp;{modelData.hair}</span>
            </motion.div>
            <motion.a
              variants={variantsAnimateParams}
              custom={9}
              className={styles.paramType}
              style={{ position: "relative", zIndex: 16 }}
              href={`https://www.instagram.com/${modelData.inst}`}
              onHoverStart={() => setCCVisible(false)}
              onHoverEnd={() => setCCVisible(true)}
            >
              inst:&nbsp;
              <span className={styles.paramValue}>&nbsp;{modelData.inst}</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const VerticalSplitScreen = ({
  children,
  slideCount,
  setSlideCount,
  slideImageLength,
  setCCVisible,
  isCCVisible,
}) => {
  const viewPort = useViewPortWidth();

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

  const changeSlide = () => {
    if (viewPort > 960) {
      const acc = slideImageLength % 2;
      if (isLeftSide) {
        if (slideCount > 0) {
          setSlideCount(slideCount - 1);
        } else if (slideCount == 0) {
          setSlideCount(
            acc == 0 ? slideImageLength / 2 - 1 : slideImageLength / 2 - 0.5
          );
        }
      } else if (!isLeftSide) {
        if (slideCount < slideImageLength / 2 - 1) {
          setSlideCount(slideCount + 1);
        } else setSlideCount(0);
      }
    } else return;
  };

  if (viewPort > 960) {
    document.addEventListener(
      "keydown",
      debounce(function (event) {
        const acc = slideImageLength % 2;
        switch (event.key) {
          case "ArrowLeft":
            if (slideCount > 0) {
              setSlideCount(slideCount - 1);
            } else if (slideCount == 0) {
              setSlideCount(
                acc == 0 ? slideImageLength / 2 - 1 : slideImageLength / 2 - 0.5
              );
            }
            break;
          case "ArrowRight":
            if (slideCount < slideImageLength / 2 - 1) {
              setSlideCount(slideCount + 1);
            } else setSlideCount(0);
            break;
          default:
            break;
        }
      }, 500)
    );
  }

  return (
    <div
      onMouseEnter={() => setCCVisible(true)}
      onMouseLeave={() => setCCVisible(false)}
      onClick={() => changeSlide()}
      className={styles.VerticalSplitScreen}
    >
      {isCCVisible && (
        <CustomCursor
          isLeftSide={isLeftSide}
          slideCount={slideCount}
          slideImageLength={slideImageLength}
          isCCVisible={isCCVisible}
        />
      )}
      {children}
    </div>
  );
};

const CustomCursor = ({ isLeftSide, isCCVisible }) => {
  const viewPort = useViewPortWidth();
  useEffect(() => {
    if (viewPort <= 960) return;
    if (!isCCVisible) return;
    const cursor = document.getElementById("custom-cursor");

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isCCVisible, viewPort]);
  const polylineStroke = () => {
    if (isLeftSide) {
      return "#000";
    } else if (!isLeftSide) {
      return "#000";
    }
  };

  return (
    viewPort > 960 && (
      <AnimatePresence>
        {isCCVisible && (
          <motion.div
            id="custom-cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              width="50"
              height="50"
              xmlns="http://www.w3.org/2000/svg"
              transform={isLeftSide ? "scale(1, 1)" : "scale(-1, 1)"}
            >
              <polyline
                points="30,15 20,25 30,35"
                stroke={polylineStroke()}
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
};

// Функция дебаунсинга
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
