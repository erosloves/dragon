"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Page({ params }) {
  const [modelData, setModelData] = useState([]);
  const [slideImage, setSlideImage] = useState([]);
  useEffect(() => {
    const getModel = async () => {
      const apiUrlEndpoint = `http://localhost:3000/api/getdata?type=selectById&id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setModelData(results[0]);
    };
    const getImage = async () => {
      const apiUrlEndpoint = `http://localhost:3000/api/images?id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      console.log(results);
      setSlideImage(results);
    };
    getModel();
    getImage();
  }, [params.id]);

  return (
    <div className={styles.container}>
      <Swiper
        // install Swiper modules
        style={{ width: "50%", height: "600px", margin: 0 }}
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
            <SwiperSlide key={img.toString()} className={styles.swiperSlide}>
              <Image
                src={img}
                alt={img}
                className={styles.img}
                width={1000}
                height={1000}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={styles.params}>
        <h2 className="">{modelData.name}</h2>
        <div className={styles.paramType}>
          height:
          <span className={styles.paramValue}> {modelData.height}</span>
        </div>
        <div className={styles.paramType}>
          bust:
          <span className={styles.paramValue}> {modelData.bust}</span>
        </div>
        <div className={styles.paramType}>
          waist:
          <span className={styles.paramValue}> {modelData.waist}</span>
        </div>
        <div className={styles.paramType}>
          shoes:
          <span className={styles.paramValue}> {modelData.shoes}</span>
        </div>
        <div className={styles.paramType}>
          eyes:
          <span className={styles.paramValue}> {modelData.eyes}</span>
        </div>
        <div className={styles.paramType}>
          hair:
          <span className={styles.paramValue}> {modelData.hair}</span>
        </div>
      </div>
    </div>
  );
}
