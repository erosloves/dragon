import Image from "next/image";
import styles from "./ModelCard.module.css";
import { useState } from "react";
import Link from "next/link";
import { Spin } from "antd";
interface ModelData {
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
const ModelCard = ({ imgSrc, name, id }: ModelData) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Link href={"/model-bio/" + id} className={styles.modelcard}>
      <figure className={styles.modelcard_img}>
        <Image
          src={"/models/" + id + "/main.jpg"}
          alt={name}
          width={isLoading ? 0 : 1000}
          height={1000}
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </figure>
      {isLoading && (
        <Spin
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
          }}
          size="large"
        />
      )}
      <span className={styles.modelcard_name}>{name}</span>
    </Link>
  );
};

export default ModelCard;
