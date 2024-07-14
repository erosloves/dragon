import Link from "next/link";
import css from "./index.module.css";
export function AdminMaBtn({ isLogged }) {
  return (
    <Link
      href={isLogged ? "/api/auth/logout" : "/api/auth/login"}
      className={`${css.btn} ${css.AdminMaBtn}`}
    >
      {isLogged ? "Logout" : "Login"}
    </Link>
  );
}
export function NavBtn() {
  return (
    <Link href={"/adminma"} className={`${css.btn} ${css.NavBtn}`}>
      Go back
    </Link>
  );
}
