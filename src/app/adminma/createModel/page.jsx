"use client";
import style from "./page.module.css";
import { useRef, useState, useEffect } from "react";
import { AdminMaBtn, NavBtn } from "@/components/AdminMaBtn";
export default function CreateModel() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [shoes, setShoes] = useState("");
  const [eyes, setEyes] = useState("");
  const [hair, setHair] = useState("");
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState([]);
  const uploadImages = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      height,
      bust,
      waist,
      hip,
      shoes,
      eyes,
      hair,
    };
    // Отпрака данных модели в БД
    await fetch("/api/postdata", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("YEEESS");

    // Отправка изображений
    const images = new FormData();
    Object.values(files).forEach((file) => {
      images.append("files", file);
    });

    // Здесь мы получаем id последней модели в БД
    const reqLastId = await fetch(`/api/getdata?type=lastId`);
    const { results } = await reqLastId.json();
    let { lastId } = results[0];

    // Чтобы потом, используя lastId отправить фотографии по указанному адресу
    const reqPostImg = await fetch(`/api/postimages?id=${lastId}`, {
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
  // Добавление изображений из формы в объект для отправки на сервер
  const mergeObjectsWithNumericKeys = (obj1, obj2) => {
    const merged = {};

    const addToMerged = (obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (merged[key] !== undefined) {
          let uniqueKey = parseInt(key, 10);
          while (merged[uniqueKey] !== undefined) {
            uniqueKey++;
          }
          merged[uniqueKey] = value;
        } else {
          merged[key] = value;
        }
      });
    };

    addToMerged(obj1);
    addToMerged(obj2);

    return merged;
  };

  const handleFilesChange = (e) => {
    const mergedObj = mergeObjectsWithNumericKeys(e.target.files, files);
    setFiles(mergedObj);
  };

  // Предпросмотр изображений

  useEffect(() => {
    if (files.length === 0) return;
    const selectedPrewievUrls = Object.values(files).map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewUrls(selectedPrewievUrls);
    // console.log();
  }, [files]);
  return (
    <div className={style.datawrapper}>
      <AdminMaBtn isLogged={true} />
      <NavBtn />
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
          onChange={(e) => setHip(e.target.value)}
          name="hip"
          required
          placeholder="hip"
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
  );
}