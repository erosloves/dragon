import styles from "./ModelCard.module.css";
import { useEffect, useState } from "react";
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

const ModelCard = ({ name, id }: ModelData) => {
  const [isLoading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const getImages = async () => {
      const apiUrlEndpoint = `/api/images?id=${id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      setAvatar(results[0]);
    };
    getImages();
  });
  return (
    <Link href={"/model-bio/" + id} className={styles.modelcard}>
      <figure className={styles.modelcard_img}>
        <img src={avatar} alt={name} onLoad={() => setLoading(false)} />
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
