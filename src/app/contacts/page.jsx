import Link from "next/link";
import css from "./page.module.css";
function Contacts() {
  return (
    <>
      <h1>Contacts</h1>
      <section>
        <div className={css.itemsCollection}>
          <div className={css.contactItem}>
            <Link href="https://www.instagram.com/thedragon__mm">
              <svg
                // fill="#000000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{
                  width: "35px",
                  height: "35px",
                  marginRight: "10px",
                }}
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
              thedragon__mm
            </Link>
          </div>
          <div className={css.contactItem}>
            <Link href="mailto:agency@thedragonmm.com">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                  transform: "translate(-3px, 8px)",
                }}
              >
                <path
                  d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              agency@thedragonmm.com
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;