"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import css from "./page.module.css";
import { useEffect, useState } from "react";

const linkVariants = {
  initial: {
    opacity: 0,
  },
  animate: (custom: number) => ({
    opacity: 1,

    transition: { delay: custom * 1, duration: 0.3 },
  }),
};

export default function Home() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, [isLoaded, setLoaded]);

  return (
    <motion.div className={css.container}>
      {isLoaded && (
        <AnimatePresence>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="200px"
            height="100px"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              position: "absolute",
              left: "50%",
              top: "10px",
              x: "-50%",
              zIndex: 17,
              width: "200px",
            }}
            key={`wiufeh823hf`}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100 }}
            transition={{ delay: 1 }}
            viewBox="0 0 314 105.98"
          >
            <defs>
              <style type="text/css">
                {`
      .str1 {stroke:#fff;strokeWidth:0.8;stroke-miterlimit:22.9256}
      .str2 {stroke:#fff;strokeWidth:0.5;stroke-miterlimit:22.9256}
      .str0 {stroke:#fff;strokeWidth:0.2;stroke-miterlimit:22.9256}
      .fil0 {fill:#fff;fill-rule:nonzero}
    `}
              </style>
            </defs>
            <g id="Слой_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <g id="_105553183992448">
                <path
                  className="fil0 str0"
                  d="M223.05 21.81l-0.94 0 0 -20.02 -7.44 0 0 -0.85 15.82 0 0 0.85 -7.44 0 0 20.02zm9.92 0l0 -20.87 0.91 0 0 9.37 13.39 0 0 -9.37 0.91 0 0 20.87 -0.91 0 0 -10.71 -13.39 0 0 10.71 -0.91 0zm19.91 -20.05l0 8.85 11.79 0 0 0.81 -11.79 0 0 9.55 13.1 0 0 0.84 -14.01 0 0 -20.87 13.72 0 0 0.82 -12.81 0z"
                />
                <path
                  className="fil0 str1"
                  d="M0.34 66.01l0 -35.78 12.81 0c3.33,0 6.13,0.82 8.4,2.47 2.27,1.66 3.9,3.81 4.88,6.46 0.99,2.65 1.48,5.7 1.48,9.13 0,5.27 -1.28,9.54 -3.83,12.81 -2.55,3.27 -6.31,4.91 -11.28,4.91l-12.46 0zm1.55 -1.4l10.86 0c4.3,0 7.63,-1.45 9.98,-4.33 2.35,-2.89 3.53,-6.88 3.53,-11.99 0,-5.17 -1.14,-9.23 -3.41,-12.18 -2.26,-2.96 -5.52,-4.43 -9.75,-4.43l-11.21 0 0 32.93zm57.29 -15.27l0 16.67 -1.55 0 0 -35.78 14.31 0c3.34,0 5.92,0.82 7.76,2.47 1.83,1.66 2.75,4 2.75,7.04 0,4.83 -2.23,7.77 -6.7,8.8l0 0.05c2,0.47 3.46,1.44 4.37,2.9 0.92,1.47 1.43,3.54 1.53,6.21 0.13,4.77 0.62,7.49 1.45,8.16l0 0.15 -1.7 0c-0.77,-0.54 -1.22,-3.31 -1.35,-8.31 -0.1,-2.97 -0.77,-5.1 -2,-6.41 -1.24,-1.3 -3.27,-1.95 -6.11,-1.95l-12.76 0zm0 -17.71l0 16.26 12.21 0c6.31,0 9.46,-2.7 9.46,-8.1 0,-2.61 -0.78,-4.62 -2.33,-6.03 -1.55,-1.42 -3.79,-2.13 -6.73,-2.13l-12.61 0zm78.26 34.38l-4.7 -12.21 -16.71 0 -4.7 12.21 -1.66 0 13.81 -35.78 1.81 0 13.81 35.78 -1.66 0zm-13.05 -33.88l-7.86 20.32 15.66 0 -7.76 -20.32 -0.04 0zm69.15 17.56l-12.46 0 0 -1.4 14.01 0 0 17.72 -1.3 0 -0.15 -8.46 -0.1 0c-0.67,2.47 -2.13,4.59 -4.38,6.35 -2.25,1.77 -5.11,2.66 -8.58,2.66 -5.24,0 -9.32,-1.72 -12.23,-5.16 -2.92,-3.43 -4.38,-7.84 -4.38,-13.21 0,-5.34 1.47,-9.76 4.43,-13.26 2.95,-3.5 7.03,-5.25 12.23,-5.25 3.74,0 6.83,0.96 9.28,2.87 2.45,1.92 4,4.55 4.63,7.89l-1.55 0c-0.57,-2.87 -1.94,-5.15 -4.13,-6.83 -2.18,-1.69 -4.93,-2.53 -8.23,-2.53 -4.8,0 -8.51,1.63 -11.11,4.9 -2.6,3.27 -3.9,7.34 -3.9,12.21 0,4.94 1.29,8.99 3.88,12.16 2.58,3.17 6.28,4.76 11.08,4.76 4,0 7.16,-1.27 9.48,-3.81 2.32,-2.53 3.48,-5.8 3.48,-9.81l0 -1.8zm59.1 11.61c-3.07,3.47 -7.02,5.21 -11.86,5.21 -4.84,0 -8.78,-1.73 -11.84,-5.18 -3.05,-3.46 -4.57,-7.85 -4.57,-13.19 0,-5.34 1.52,-9.75 4.57,-13.23 3.06,-3.49 7,-5.23 11.84,-5.23 4.84,0 8.8,1.74 11.88,5.23 3.09,3.48 4.63,7.89 4.63,13.23 0,5.31 -1.55,9.69 -4.65,13.16zm-22.62 -1.05c2.7,3.2 6.29,4.81 10.76,4.81 4.47,0 8.06,-1.62 10.78,-4.86 2.72,-3.23 4.08,-7.25 4.08,-12.06 0,-4.84 -1.36,-8.88 -4.08,-12.13 -2.72,-3.25 -6.31,-4.88 -10.78,-4.88 -4.47,0 -8.05,1.62 -10.74,4.85 -2.68,3.24 -4.02,7.29 -4.02,12.16 0,4.84 1.33,8.88 4,12.11zm83.52 -30.02l0 35.78 -1.65 0 -23.32 -33.18 -0.05 0 0 33.18 -1.5 0 0 -35.78 1.75 0 23.22 33.17 0.05 0 0 -33.17 1.5 0z"
                />
                <path
                  className="fil0 str2"
                  d="M68.3 106.57l-9.51 -22.25 -0.03 0 0 22.25 -1 0 0 -23.85 1.5 0 9.57 22.48 0.04 0 9.44 -22.48 1.57 0 0 23.85 -1.04 0 0 -22.25 -0.03 0 -9.44 22.25 -1.07 0zm55.68 0l-9.51 -22.25 -0.04 0 0 22.25 -1 0 0 -23.85 1.5 0 9.58 22.48 0.03 0 9.44 -22.48 1.57 0 0 23.85 -1.03 0 0 -22.25 -0.04 0 -9.44 22.25 -1.06 0z"
                />
              </g>
            </g>
          </motion.svg>
          <motion.div
            initial="initial"
            whileInView="animate"
            className={css.layout}
            key={`394h348`}
          >
            <motion.div
              key={`sodifjsodjf`}
              custom={2}
              className={css.link}
              variants={linkVariants}
            >
              <Link href="/models">models</Link>
            </motion.div>
            <motion.div
              key={`ebwieuwe`}
              custom={3}
              className={css.link}
              variants={linkVariants}
            >
              <Link href="/contacts">contacts</Link>
            </motion.div>
            <motion.div
              key={`svskdjvn`}
              custom={4}
              className={css.link}
              variants={linkVariants}
            >
              <Link href="https://t.me/thedragonmm_bot">become a model</Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className={css.loading}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width="600px"
              height="200px"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                imageRendering: "auto",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 1 }}
              viewBox="0 0 314 105.98"
            >
              <defs>
                <style type="text/css">
                  {`
      .str1 {stroke:#fff;strokeWidth:0.8;stroke-miterlimit:22.9256}
      .str2 {stroke:#fff;strokeWidth:0.5;stroke-miterlimit:22.9256}
      .str0 {stroke:#fff;strokeWidth:0.2;stroke-miterlimit:22.9256}
      .fil0 {fill:#fff;fill-rule:nonzero}
    `}
                </style>
              </defs>
              <g id="Слой_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <g id="_105553183992448">
                  <path
                    className="fil0 str0"
                    d="M223.05 21.81l-0.94 0 0 -20.02 -7.44 0 0 -0.85 15.82 0 0 0.85 -7.44 0 0 20.02zm9.92 0l0 -20.87 0.91 0 0 9.37 13.39 0 0 -9.37 0.91 0 0 20.87 -0.91 0 0 -10.71 -13.39 0 0 10.71 -0.91 0zm19.91 -20.05l0 8.85 11.79 0 0 0.81 -11.79 0 0 9.55 13.1 0 0 0.84 -14.01 0 0 -20.87 13.72 0 0 0.82 -12.81 0z"
                  />
                  <path
                    className="fil0 str1"
                    d="M0.34 66.01l0 -35.78 12.81 0c3.33,0 6.13,0.82 8.4,2.47 2.27,1.66 3.9,3.81 4.88,6.46 0.99,2.65 1.48,5.7 1.48,9.13 0,5.27 -1.28,9.54 -3.83,12.81 -2.55,3.27 -6.31,4.91 -11.28,4.91l-12.46 0zm1.55 -1.4l10.86 0c4.3,0 7.63,-1.45 9.98,-4.33 2.35,-2.89 3.53,-6.88 3.53,-11.99 0,-5.17 -1.14,-9.23 -3.41,-12.18 -2.26,-2.96 -5.52,-4.43 -9.75,-4.43l-11.21 0 0 32.93zm57.29 -15.27l0 16.67 -1.55 0 0 -35.78 14.31 0c3.34,0 5.92,0.82 7.76,2.47 1.83,1.66 2.75,4 2.75,7.04 0,4.83 -2.23,7.77 -6.7,8.8l0 0.05c2,0.47 3.46,1.44 4.37,2.9 0.92,1.47 1.43,3.54 1.53,6.21 0.13,4.77 0.62,7.49 1.45,8.16l0 0.15 -1.7 0c-0.77,-0.54 -1.22,-3.31 -1.35,-8.31 -0.1,-2.97 -0.77,-5.1 -2,-6.41 -1.24,-1.3 -3.27,-1.95 -6.11,-1.95l-12.76 0zm0 -17.71l0 16.26 12.21 0c6.31,0 9.46,-2.7 9.46,-8.1 0,-2.61 -0.78,-4.62 -2.33,-6.03 -1.55,-1.42 -3.79,-2.13 -6.73,-2.13l-12.61 0zm78.26 34.38l-4.7 -12.21 -16.71 0 -4.7 12.21 -1.66 0 13.81 -35.78 1.81 0 13.81 35.78 -1.66 0zm-13.05 -33.88l-7.86 20.32 15.66 0 -7.76 -20.32 -0.04 0zm69.15 17.56l-12.46 0 0 -1.4 14.01 0 0 17.72 -1.3 0 -0.15 -8.46 -0.1 0c-0.67,2.47 -2.13,4.59 -4.38,6.35 -2.25,1.77 -5.11,2.66 -8.58,2.66 -5.24,0 -9.32,-1.72 -12.23,-5.16 -2.92,-3.43 -4.38,-7.84 -4.38,-13.21 0,-5.34 1.47,-9.76 4.43,-13.26 2.95,-3.5 7.03,-5.25 12.23,-5.25 3.74,0 6.83,0.96 9.28,2.87 2.45,1.92 4,4.55 4.63,7.89l-1.55 0c-0.57,-2.87 -1.94,-5.15 -4.13,-6.83 -2.18,-1.69 -4.93,-2.53 -8.23,-2.53 -4.8,0 -8.51,1.63 -11.11,4.9 -2.6,3.27 -3.9,7.34 -3.9,12.21 0,4.94 1.29,8.99 3.88,12.16 2.58,3.17 6.28,4.76 11.08,4.76 4,0 7.16,-1.27 9.48,-3.81 2.32,-2.53 3.48,-5.8 3.48,-9.81l0 -1.8zm59.1 11.61c-3.07,3.47 -7.02,5.21 -11.86,5.21 -4.84,0 -8.78,-1.73 -11.84,-5.18 -3.05,-3.46 -4.57,-7.85 -4.57,-13.19 0,-5.34 1.52,-9.75 4.57,-13.23 3.06,-3.49 7,-5.23 11.84,-5.23 4.84,0 8.8,1.74 11.88,5.23 3.09,3.48 4.63,7.89 4.63,13.23 0,5.31 -1.55,9.69 -4.65,13.16zm-22.62 -1.05c2.7,3.2 6.29,4.81 10.76,4.81 4.47,0 8.06,-1.62 10.78,-4.86 2.72,-3.23 4.08,-7.25 4.08,-12.06 0,-4.84 -1.36,-8.88 -4.08,-12.13 -2.72,-3.25 -6.31,-4.88 -10.78,-4.88 -4.47,0 -8.05,1.62 -10.74,4.85 -2.68,3.24 -4.02,7.29 -4.02,12.16 0,4.84 1.33,8.88 4,12.11zm83.52 -30.02l0 35.78 -1.65 0 -23.32 -33.18 -0.05 0 0 33.18 -1.5 0 0 -35.78 1.75 0 23.22 33.17 0.05 0 0 -33.17 1.5 0z"
                  />
                  <path
                    className="fil0 str2"
                    d="M68.3 106.57l-9.51 -22.25 -0.03 0 0 22.25 -1 0 0 -23.85 1.5 0 9.57 22.48 0.04 0 9.44 -22.48 1.57 0 0 23.85 -1.04 0 0 -22.25 -0.03 0 -9.44 22.25 -1.07 0zm55.68 0l-9.51 -22.25 -0.04 0 0 22.25 -1 0 0 -23.85 1.5 0 9.58 22.48 0.03 0 9.44 -22.48 1.57 0 0 23.85 -1.03 0 0 -22.25 -0.04 0 -9.44 22.25 -1.06 0z"
                  />
                </g>
              </g>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
      {isLoaded && <VideoComponent />}

      {/* {isLoaded && (
        <motion.video
          className={css.video}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          autoPlay
          muted
          loop
          playsInline
          src="/video/IMG_7064.mov"
          id="preview"
        />
      )} */}
    </motion.div>
  );
}

const VideoComponent = () => {
  const videoHTML = `
      <video
        class=${css.video}
        autoPlay
        playsInline
        muted
        loop
      >
        <source src="/video/IMG_7064.mov" type="video/mp4" />
      </video>
  `;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 15,
        width: "100%",
        height: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: videoHTML }}
    />
  );
};
