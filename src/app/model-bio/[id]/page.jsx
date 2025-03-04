"use client";
import styles from "./page.module.css";
import React, { useState, useEffect, useRef } from "react";
import useViewPortWidth from "@/hooks/useViewPortWidth";
import { AnimatePresence, motion } from "framer-motion";
import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

export default function Page({ params }) {
  const [modelData, setModelData] = useState([]);
  const [slideImage, setSlideImage] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const { id } = use(params);

  useEffect(() => {
    const getModel = async () => {
      const apiUrlEndpoint = `/api/client/getdata?type=selectById&id=${id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setModelData(results[0]);
      setDataIsLoaded(true);
    };

    getModel();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      try {
        const apiUrlEndpoint = `/api/client/getimages?id=${id}`;
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
  }, [id]);

  const titleImg = slideImage.filter((el) => {
    if (el.slice(-9).toLowerCase() == "title.jpg") {
      return el;
    }
  });

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

      <Gallery props={{ slideImage }} />

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
// new commit

const Gallery = ({ props }) => {
  const { slideImage } = props;
  const [isCCVisible, setCCVisible] = useState(false);
  const [isLeftSide, setIsLeftSide] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const viewPort = useViewPortWidth();

  const swiperWrapperStyle = {
    width: "80%",
    height: "calc(100vh - 160px)",
  };
  const swiperSlideStyle = {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    gap: "5px",
  };
  const imgStyle = {
    objectFit: "cover",
    width: "40%",
    height: "100%",
  };
  const imgStyleMobile = {
    objectFit: "cover",
    width: "100%",
    // height: "100%",

    padding: "0 10px 10px 10px",
  };
  const controllerStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
    display: "flex",
    flexWrap: "nowrap",
  };
  const controllerStyleItem = {
    height: "100%",
    width: "100%",
  };

  const switchSlide = (side) => {
    if (side) {
      (swiperInstance.activeIndex === 0 &&
        swiperInstance.slideTo(swiperInstance.slides.length - 1, 3000)) ||
        swiperInstance.slideTo(swiperInstance.activeIndex - 1, 1000);
    }
    if (!side) {
      (swiperInstance.activeIndex === swiperInstance.slides.length - 1 &&
        swiperInstance.slideTo(0, 3000)) ||
        swiperInstance.slideTo(swiperInstance.activeIndex + 1, 1000);
    }
  };

  useKeyPress((event) => {
    switch (event.key) {
      case "ArrowLeft":
        switchSlide(true);
        break;
      case "ArrowRight":
        switchSlide(false);
        break;

      default:
        break;
    }
  });

  if (viewPort <= 960)
    return (
      <AnimatePresence>
        {slideImage.map((src, index) => {
          if (!(src.slice(-9).toLowerCase() == "title.jpg")) {
            return (
              <motion.img
                src={src}
                alt={src}
                style={imgStyleMobile}
                key={index}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
              />
            );
          }
        })}
      </AnimatePresence>
    );
  if (viewPort > 960)
    return (
      <div
        onMouseEnter={() => setCCVisible(true)}
        onMouseLeave={() => setCCVisible(false)}
        style={{
          width: "100%",
          height: "100%",
          cursor: "none",
          position: "relative",
        }}
        onClick={() => {
          switchSlide(isLeftSide);
        }}
      >
        <div style={controllerStyle}>
          <div
            onMouseEnter={() => {
              setIsLeftSide(true);
            }}
            style={controllerStyleItem}
          ></div>
          <div
            onMouseEnter={() => {
              setIsLeftSide(false);
            }}
            style={controllerStyleItem}
          ></div>
        </div>
        <Swiper
          slidesPerView={1}
          allowTouchMove={0}
          style={swiperWrapperStyle}
          onSwiper={setSwiperInstance}
        >
          <CustomCursor props={{ isCCVisible, isLeftSide, viewPort }} />
          {slideImage.map((src, index, arr) => {
            if (
              !(src.slice(-9).toLowerCase() == "title.jpg") &&
              index % 2 === 0
            ) {
              return (
                <SwiperSlide key={index} style={swiperSlideStyle}>
                  <Image
                    src={arr[index] || null}
                    alt={arr[index]}
                    width={500}
                    height={500}
                    style={imgStyle}
                  />
                  <Image
                    src={arr[index + 1] || null}
                    alt={arr[index + 1]}
                    width={500}
                    height={500}
                    style={imgStyle}
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    );
};

const useKeyPress = (callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      callback(event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

const CustomCursor = ({ props }) => {
  const { isLeftSide, isCCVisible, viewPort } = props;

  useEffect(() => {
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
