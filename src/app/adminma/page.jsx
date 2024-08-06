"use client";
import css from "./page.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const currentPath = usePathname();
  return (
    <div className={css.wrapper}>
      <h2>{user.name}, welcome to admin panel</h2>
      <Link className={css.link} href={currentPath + "/createModel"}>
        Create a model
      </Link>
      <Link className={css.link} href={currentPath + "/editModel"}>
        Edit models
      </Link>
    </div>
  );
}
