"use client";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import NavigationBetween from "@/components/NavigationBetween";
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <div className={styles.swiper}>
        <AnimatePresence>
          {dataIsLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Swiper
                // install Swiper modules

                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  bulletActiveClass: styles.bulletActiveClass,
                  bulletClass: styles.bulletClass,
                }}
              >
                {slideImage.map((img) => {
                  return (
                    <SwiperSlide
                      key={img.toString()}
                      className={styles.swiperSlide}
                    >
                      <Image
                        src={img}
                        alt={img}
                        className={styles.img}
                        width={1000}
                        height={1000}
                        onLoad={() => setLoading(false)}
                      />
                      {isLoading && (
                        <Spin
                          style={{
                            position: "absolute",
                            top: "45%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 20,
                          }}
                          size="large"
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NavigationBetween
        currentId={Number(currentId)}
        setCurrentId={setCurrentId}
        h2value={modelData.name}
        modelsCount={modelsCount}
      />
      <motion.div initial="hidden" animate="visible" className={styles.params}>
        {dataIsLoaded && (
          <AnimatePresence>
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
              <span className={styles.paramValue}> {modelData.height}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={3}
              className={styles.paramType}
            >
              bust:
              <span className={styles.paramValue}> {modelData.bust}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={4}
              className={styles.paramType}
            >
              waist:
              <span className={styles.paramValue}> {modelData.waist}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={5}
              className={styles.paramType}
            >
              shoes:
              <span className={styles.paramValue}> {modelData.shoes}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={6}
              className={styles.paramType}
            >
              eyes:
              <span className={styles.paramValue}> {modelData.eyes}</span>
            </motion.div>
            <motion.div
              variants={variantsAnimateParams}
              custom={7}
              className={styles.paramType}
            >
              hair:
              <span className={styles.paramValue}> {modelData.hair}</span>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}
