import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import styles from "./Swiper.module.css";

interface Slides {
  slidesList: [
    {
      id: number;
      imgSrc: string;
      url: string;
      name: string;
      height: number;
      bust: number;
      waist: number;
      shoes: number;
      eyes: string;
      hair: string;
    }
  ];
}
const CreateSwiper = ({ slidesList }: Slides) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className={styles.Swiper}
    >
      {slidesList.map((el) => {
        return (
          <SwiperSlide key={el.id}>
            <Image
              src={el.imgSrc}
              alt={el.name}
              style={{ backgroundColor: "gray", width: "100%", height: "50%" }}
            />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};

export default CreateSwiper;
