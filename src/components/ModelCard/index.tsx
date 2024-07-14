import styles from "./ModelCard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 1 } }}
              style={{
                position: "absolute",
                top: "0",
                left: "0",

                zIndex: 5,
                width: "100%",
                height: "100%",
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </motion.div>
          )}
        </AnimatePresence>
      </figure>

      <span className={styles.modelcard_name}>{name}</span>
    </Link>
  );
};

export default ModelCard;
