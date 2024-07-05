import Image from "next/image";
import styles from "./ModelCard.module.css";
import Link from "next/link";
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
  return (
    <Link href={"/model-bio/" + id} className={styles.modelcard}>
      <Image
        src={"/models/" + id + "/1.jpg"}
        alt={name}
        className={styles.modelcard_img}
        width={100}
        height={100}
      />

      <span className={styles.modelcard_name}>{name}</span>
    </Link>
  );
};

export default ModelCard;
