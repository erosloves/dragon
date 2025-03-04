import Link from "next/link";
import css from "./index.module.css";
import { usePathname, useRouter } from "next/navigation";

export function AdminMaBtn({ text, onClick, type }) {
  return (
    <button className={`${css.btn}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
export function NavBtn() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname == "/adminma") {
    return null;
  }

  return (
    <Link
      href={"/adminma"}
      className={`${css.btn} ${css.NavBtn}`}
      onClick={() => router.push("/adminma")}
    >
      Go back
    </Link>
  );
}
