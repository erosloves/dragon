"use client";
import css from "./page.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const currentPath = usePathname();

  return (
    <div className={css.wrapper}>
      <div className={css.wrapper_item}>
        <h2>
          {/* {user.name},  */}
          welcome to admin panel
        </h2>
      </div>
      <Link className={css.link} href={currentPath + "/createModel"}>
        Create a model
      </Link>
      <Link className={css.link} href={currentPath + "/editModel"}>
        Edit models
      </Link>
    </div>
  );
}
