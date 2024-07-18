"use client";
import style from "./page.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { NotificationContext } from "@/contexts/notification";

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
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState([]);
  const uploadImages = useRef();

  const { isNotifyVisible, setNotifyVisible, notifyData, setNotifyData } =
    useContext(NotificationContext);

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
      inst,
    };
    // Отпрака данных модели в БД
    await fetch("/api/postdata", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Отправка изображений
    const images = new FormData();
    Object.values(files).forEach((file) => {
      images.append("files", file);
    });

    // Здесь мы получаем id последней модели в БД
    const reqLastId = await fetch(`/api/client/getdata?type=lastId`);
    const { results } = await reqLastId.json();
    let { lastId } = results[0];

    // // Чтобы потом, используя lastId отправить фотографии по указанному адресу
    const reqPostImg = await fetch(`/api/admin/postimages?id=${lastId}`, {
      method: "POST",
      body: images,
    });

    if (reqPostImg.ok && reqLastId.ok) {
      // Очистка формы после отправки
      Array.from(e.target.childNodes).map((e) => (e.value = ""));
      setFiles({});
      setNotifyVisible(true);
      setNotifyData({ text: "Success!", status: "ok" });
    } else {
      setNotifyData({ text: "Something was wrong!", status: "error" });
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
  }, [files]);

  return (
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
        <input
          onChange={(e) => setInst(e.target.value)}
          name="inst"
          required
          placeholder="inst"
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
