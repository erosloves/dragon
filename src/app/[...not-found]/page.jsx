import Link from "next/link";
import styles from "./page.module.css";

export default function notFound() {
  return (
    <div className={styles.notfound}>
      <div>Not found</div>
      <Link href="/">go home</Link>
    </div>
  );
}
