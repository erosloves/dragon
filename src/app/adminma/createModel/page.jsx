// pages/CreateModel.js
"use client";

import style from "./page.module.css";
import { useState, useContext } from "react";
import { NotificationContext } from "@/contexts/notification";
import ImageUpload from "@/components/ImageUpload";

import LoadingComponent from "@/components/LoadingComponent";
import { AnimatePresence } from "framer-motion";

export default function CreateModel() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [shoes, setShoes] = useState("");
  const [eyes, setEyes] = useState("");
  const [hair, setHair] = useState("");
  const [inst, setInst] = useState("");
  const [images, setImages] = useState([]); // Используем images вместо files

  const [isLoading, setIsloading] = useState(false);

  const { setNotifyVisible, setNotifyData } = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const numericFields = { height, bust, waist, hip, shoes };
    for (const [field, value] of Object.entries(numericFields)) {
      if (value === "" || isNaN(Number(value))) {
        setNotifyVisible(true);
        setNotifyData({
          text: `Поле ${field} должно быть числом`,
          status: "error",
        });
        return;
      }
    }

    const reqLastId = await fetch(`/api/client/getdata?type=lastId`);
    const { results } = await reqLastId.json();
    let { lastId } = results[0];

    const data = {
      lastId,
      name,
      height: Number(height),
      bust: Number(bust),
      waist: Number(waist),
      hip: Number(hip),
      shoes: Number(shoes),
      eyes,
      hair,
      inst,
    };

    const sendPostData = await fetch("/api/admin/postdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (images.length === 0) {
      setNotifyVisible(true);
      setNotifyData({ text: "Не выбраны файлы для загрузки", status: "error" });
      setIsloading(false);
      return;
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      const fileExtension = image.file.name.split(".").pop();
      const newFileName = `${index + 1}.${fileExtension}`;
      const renamedFile = new File([image.file], newFileName, {
        type: image.file.type,
      });
      formData.append("files", renamedFile);
    });

    const reqPostImg = await fetch(
      `/api/admin/postimages?name=${encodeURIComponent(name)}&id=${lastId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const { message } = await reqPostImg.json();

    if (sendPostData.ok && reqPostImg.ok) {
      // Очистка после успешной отправки
      Array.from(e.target.childNodes).forEach((node) => {
        if (node.tagName === "INPUT") node.value = "";
      });
      setName("");
      setHeight("");
      setBust("");
      setWaist("");
      setHip("");
      setShoes("");
      setEyes("");
      setHair("");
      setInst("");
      setImages([]); // Очищаем изображения только после успеха
      setNotifyVisible(true);
      setNotifyData({ text: message, status: "ok" });
      setIsloading(false);
    } else {
      setNotifyVisible(true);
      setNotifyData({
        text: message || "Ошибка отправки данных",
        status: "error",
      });
      setIsloading(false);
    }
  };

  const handleImagesChange = (newImages) => {
    console.log(
      "Received images from ImageUpload:",
      newImages.map((img) => img.file.name)
    );
    setImages(newImages);
  };

  return (
    <div className={style.datawrapper}>
      <AnimatePresence>{isLoading && <LoadingComponent />}</AnimatePresence>
      <form className={style.inputwrapper} onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
          placeholder="name"
          type="text"
          value={name}
        />
        <input
          onChange={(e) => setHeight(e.target.value)}
          name="height"
          required
          placeholder="height"
          type="number"
          value={height}
        />
        <input
          onChange={(e) => setBust(e.target.value)}
          name="bust"
          required
          placeholder="bust"
          type="number"
          value={bust}
        />
        <input
          onChange={(e) => setWaist(e.target.value)}
          name="waist"
          required
          placeholder="waist"
          type="number"
          value={waist}
        />
        <input
          onChange={(e) => setHip(e.target.value)}
          name="hip"
          required
          placeholder="hip"
          type="number"
          value={hip}
        />
        <input
          onChange={(e) => setShoes(e.target.value)}
          name="shoes"
          required
          placeholder="shoes"
          type="number"
          value={shoes}
        />
        <input
          onChange={(e) => setEyes(e.target.value)}
          name="eyes"
          required
          placeholder="eyes"
          type="text"
          value={eyes}
        />
        <input
          onChange={(e) => setHair(e.target.value)}
          name="hair"
          required
          placeholder="hair"
          type="text"
          value={hair}
        />
        <input
          onChange={(e) => setInst(e.target.value)}
          name="inst"
          required
          placeholder="inst"
          type="text"
          value={inst}
        />
        <button className={style.sendButton} type="submit">
          send
        </button>
      </form>
      <div className={style.postimageswrapper}>
        <ImageUpload onImagesChange={handleImagesChange} images={images} />
      </div>
    </div>
  );
}
