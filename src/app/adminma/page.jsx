"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Layout from "./layout";
import Notification from "@/components/Notification/Notification";
import style from "./page.module.css";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [shoes, setShoes] = useState("");
  const [eyes, setEyes] = useState("");
  const [hair, setHair] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const uploadImages = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      height,
      bust,
      waist,
      shoes,
      eyes,
      hair,
    };
    // Отпрака данных модели в БД
    fetch("api/postdata", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Отправка изображений
    const images = new FormData();
    Array.from(files).forEach((file) => {
      images.append("files", file);
    });

    // Здесь мы получаем id последней модели в БД
    const reqLastId = await fetch(`api/getdata?type=lastId`);
    const { results } = await reqLastId.json();
    let { lastId } = results[0];

    // Чтобы потом, используя lastId отправить фотографии по указанному адресу
    const reqPostImg = await fetch(`api/postimages?id=${lastId}`, {
      method: "POST",
      body: images,
    });

    if (reqPostImg.ok && reqLastId.ok) {
      // Очистка формы после отправки
      Array.from(e.target.childNodes).map((e) => (e.value = ""));
      setPreviewUrls([]);
      //
      setNotifyVisible(true);
      setNotifyMsg({ text: "Success!", status: "ok" });
    } else {
      console.error("Something was wrong!");
    }
  };
  // Предпросмотр изображений

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    if (files.length === 0) return;
    const selectedPrewievUrls = Array.from(files).map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewUrls(selectedPrewievUrls);
  }, [files]);

  // notification
  const [notifyVisible, setNotifyVisible] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifyVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [notifyVisible]);

  return (
    <Layout>
      <div className={style.datawrapper}>
        <form className={style.inputwrapper} onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
            placeholder="name"
            type="text"
          />
          <input
            onChange={(e) => setHeight(e.target.value)}
            name="height"
            required
            placeholder="height"
            type="text"
          />
          <input
            onChange={(e) => setBust(e.target.value)}
            name="bust"
            required
            placeholder="bust"
            type="text"
          />
          <input
            onChange={(e) => setWaist(e.target.value)}
            name="waist"
            required
            placeholder="waist"
            type="text"
          />
          <input
            onChange={(e) => setShoes(e.target.value)}
            name="shoes"
            required
            placeholder="shoes"
            type="text"
          />
          <input
            onChange={(e) => setEyes(e.target.value)}
            name="eyes"
            required
            placeholder="eyes"
            type="text"
          />
          <input
            onChange={(e) => setHair(e.target.value)}
            name="hair"
            required
            placeholder="hair"
            type="text"
          />
          <button type="submit">send</button>
        </form>
        <div className={style.postimageswrapper}>
          <input
            multiple
            onChange={handleFilesChange}
            type="file"
            ref={uploadImages}
          />
          <button onClick={() => uploadImages.current.click()}>
            upload images
          </button>

          {previewUrls.length > 0 && (
            <div className={style.imageswrapper}>
              {previewUrls.map((url, index) => (
                <div className={style.imageswrapper__item} key={index}>
                  <img src={url} alt={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {notifyVisible && (
          <Notification
            key="child"
            isVisible={notifyVisible}
            notifyData={notifyMsg}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
