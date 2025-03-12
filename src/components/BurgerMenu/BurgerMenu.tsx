"use client";
import Link from "next/link";
import styles from "./BurgerMenu.module.css";

import { useToggleMenuContext } from "@/contexts/ToggleMenu";
const BurgerMenu: React.FC = () => {
  const { toggleMenuVisible, burgerOpen } = useToggleMenuContext();

  const toggleBurgerMenu = () => {
    toggleMenuVisible();
  };
  return (
    <>
      <div className={styles.burgerMenu} onClick={toggleBurgerMenu}>
        <span className={burgerOpen ? styles.span_active : styles.span}></span>
        <span className={burgerOpen ? styles.span_active : styles.span}></span>
        <span className={burgerOpen ? styles.span_active : styles.span}></span>
        <span className={burgerOpen ? styles.span_active : styles.span}></span>
      </div>
      {/* <Link
        href="https://www.instagram.com/thedragon__mm"
        className={styles.social}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
        >
          <g id="social-instagram">
            <path
              d="M23.9,7.1c-0.1-1.3-0.3-2.1-0.6-2.9C23.1,3.4,22.7,2.7,22,2s-1.3-1.1-2.1-1.4c-0.8-0.3-1.6-0.5-2.9-0.6C15.7,0,15.3,0,12,0
		S8.3,0,7.1,0.1C5.8,0.1,4.9,0.3,4.1,0.6C3.4,0.9,2.7,1.3,2,2S0.9,3.4,0.6,4.1C0.3,4.9,0.1,5.8,0.1,7.1C0,8.3,0,8.7,0,12
		s0,3.7,0.1,4.9c0.1,1.3,0.3,2.1,0.6,2.9C0.9,20.6,1.3,21.3,2,22s1.3,1.1,2.1,1.4c0.8,0.3,1.6,0.5,2.9,0.6C8.3,24,8.7,24,12,24
		s3.7,0,4.9-0.1c1.3-0.1,2.1-0.3,2.9-0.6c0.8-0.3,1.5-0.7,2.1-1.4s1.1-1.3,1.4-2.1c0.3-0.8,0.5-1.6,0.6-2.9C24,15.7,24,15.3,24,12
		S24,8.3,23.9,7.1z M21.8,16.8c-0.1,1.2-0.2,1.8-0.4,2.2c-0.2,0.6-0.5,1-0.9,1.4s-0.8,0.7-1.4,0.9c-0.4,0.2-1.1,0.4-2.2,0.4
		c-1.3,0.1-1.6,0.1-4.8,0.1s-3.6,0-4.8-0.1c-1.2-0.1-1.8-0.2-2.2-0.4c-0.6-0.2-1-0.5-1.4-0.9s-0.7-0.8-0.9-1.4
		c-0.2-0.4-0.4-1.1-0.4-2.2c-0.1-1.3-0.1-1.6-0.1-4.8s0-3.6,0.1-4.8C2.3,6,2.5,5.3,2.6,4.9c0.2-0.6,0.5-1,0.9-1.4s0.8-0.7,1.4-0.9
		C5.3,2.5,6,2.3,7.2,2.2C8.4,2.2,8.8,2.2,12,2.2s3.6,0,4.8,0.1c1.2,0.1,1.8,0.2,2.2,0.4c0.6,0.2,1,0.5,1.4,0.9s0.7,0.8,0.9,1.4
		c0.2,0.4,0.4,1.1,0.4,2.2c0.1,1.3,0.1,1.6,0.1,4.8S21.8,15.6,21.8,16.8z"
            />
            <path
              d="M12,6c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,6,12,6z M12,15.9c-2.2,0-3.9-1.7-3.9-3.9S9.8,8.1,12,8.1s3.9,1.7,3.9,3.9
		S14.2,15.9,12,15.9z"
            />
            <circle cx="18.5" cy="6" r="1.5" />
          </g>
        </svg>
      </Link> */}
      <Link
        href={"https://t.me/thedragonmm_casting_bot"}
        className={styles.social}
        target="_blank"
      >
        <svg
          fill="#000000"
          width="20px"
          height="20px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 26.070313 3.996094 C 25.734375 4.011719 25.417969 4.109375 25.136719 4.21875 L 25.132813 4.21875 C 24.847656 4.332031 23.492188 4.902344 21.433594 5.765625 C 19.375 6.632813 16.703125 7.757813 14.050781 8.875 C 8.753906 11.105469 3.546875 13.300781 3.546875 13.300781 L 3.609375 13.277344 C 3.609375 13.277344 3.25 13.394531 2.875 13.652344 C 2.683594 13.777344 2.472656 13.949219 2.289063 14.21875 C 2.105469 14.488281 1.957031 14.902344 2.011719 15.328125 C 2.101563 16.050781 2.570313 16.484375 2.90625 16.722656 C 3.246094 16.964844 3.570313 17.078125 3.570313 17.078125 L 3.578125 17.078125 L 8.460938 18.722656 C 8.679688 19.425781 9.949219 23.597656 10.253906 24.558594 C 10.433594 25.132813 10.609375 25.492188 10.828125 25.765625 C 10.933594 25.90625 11.058594 26.023438 11.207031 26.117188 C 11.265625 26.152344 11.328125 26.179688 11.390625 26.203125 C 11.410156 26.214844 11.429688 26.21875 11.453125 26.222656 L 11.402344 26.210938 C 11.417969 26.214844 11.429688 26.226563 11.441406 26.230469 C 11.480469 26.242188 11.507813 26.246094 11.558594 26.253906 C 12.332031 26.488281 12.953125 26.007813 12.953125 26.007813 L 12.988281 25.980469 L 15.871094 23.355469 L 20.703125 27.0625 L 20.8125 27.109375 C 21.820313 27.550781 22.839844 27.304688 23.378906 26.871094 C 23.921875 26.433594 24.132813 25.875 24.132813 25.875 L 24.167969 25.785156 L 27.902344 6.65625 C 28.007813 6.183594 28.035156 5.742188 27.917969 5.3125 C 27.800781 4.882813 27.5 4.480469 27.136719 4.265625 C 26.769531 4.046875 26.40625 3.980469 26.070313 3.996094 Z M 25.96875 6.046875 C 25.964844 6.109375 25.976563 6.101563 25.949219 6.222656 L 25.949219 6.234375 L 22.25 25.164063 C 22.234375 25.191406 22.207031 25.25 22.132813 25.308594 C 22.054688 25.371094 21.992188 25.410156 21.667969 25.28125 L 15.757813 20.75 L 12.1875 24.003906 L 12.9375 19.214844 C 12.9375 19.214844 22.195313 10.585938 22.59375 10.214844 C 22.992188 9.84375 22.859375 9.765625 22.859375 9.765625 C 22.886719 9.3125 22.257813 9.632813 22.257813 9.632813 L 10.082031 17.175781 L 10.078125 17.15625 L 4.242188 15.191406 L 4.242188 15.1875 C 4.238281 15.1875 4.230469 15.183594 4.226563 15.183594 C 4.230469 15.183594 4.257813 15.171875 4.257813 15.171875 L 4.289063 15.15625 L 4.320313 15.144531 C 4.320313 15.144531 9.53125 12.949219 14.828125 10.71875 C 17.480469 9.601563 20.152344 8.476563 22.207031 7.609375 C 24.261719 6.746094 25.78125 6.113281 25.867188 6.078125 C 25.949219 6.046875 25.910156 6.046875 25.96875 6.046875 Z" />
        </svg>
      </Link>
    </>
  );
};

export default BurgerMenu;
