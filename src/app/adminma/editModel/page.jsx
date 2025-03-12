"use client";

import css from "./page.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { NotificationContext } from "@/contexts/notification";
import { AnimatePresence, motion } from "framer-motion";
import LoadingComponent from "@/components/LoadingComponent"; // Импорт LoadingComponent

function Page() {
  const { setNotifyVisible, setNotifyData } = useContext(NotificationContext);
  const [modelsData, setModelsData] = useState(null); // null пока данные не загружены
  const [dataForEditing, setDataForEditing] = useState([]);
  const [titlePicture, setTitlePicture] = useState();
  const [editorCurrentId, setEditorCurrentId] = useState();
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [isPhotosEditorVisible, setTitlePhotoEditorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getModelsData = async () => {
    try {
      const req = await fetch("/api/client/getdata?type=selectAll");
      if (!req.ok) {
        throw new Error(`Ошибка загрузки данных: ${req.status}`);
      }
      const { results } = await req.json();
      setModelsData(Array.isArray(results) ? results : []);
      setIsLoading(false);
    } catch (error) {
      setModelsData([]); // Устанавливаем пустой массив в случае ошибки
      setNotifyVisible(true);
      setNotifyData({
        text: "Ошибка загрузки данных моделей",
        status: "error",
      });
    }
  };

  // Функция обновления списка моделей
  const refreshModels = async () => {
    await getModelsData(); // Повторно вызываем тот же запрос
  };

  useEffect(() => {
    getModelsData();
  }, []);

  const getImagesList = async (id) => {
    try {
      const apiUrlEndpoint = `/api/client/getimages?id=${id}`;
      const req = await fetch(apiUrlEndpoint);
      if (!req.ok) {
        throw new Error(`Ошибка загрузки изображений: ${req.status}`);
      }
      const { results } = await req.json();

      setIsLoading(false);
      return results;
    } catch (error) {
      setIsLoading(false);
      return [];
    }
  };

  const parseImagesList = (arr) => {
    let hasTitle = arr.filter((el) => el.includes("title"));
    hasTitle = hasTitle.length > 0 ? hasTitle[0] : null;
    return hasTitle;
  };

  const editParams = async (id) => {
    const req = await fetch(`/api/admin/editdata?id=${id}&action=params`);
    const { results } = await req.json();
    if (req.ok) {
      setDataForEditing(results[0]);
      setEditorVisible(true);
    }
  };

  const editTitlePhoto = async (id) => {
    setIsLoading(true);
    const imagesList = await getImagesList(id);
    const titlePictureState = parseImagesList(imagesList);
    setTitlePicture(titlePictureState);
    setEditorCurrentId(id);
    setTitlePhotoEditorVisible(true);
  };

  const removeModel = async (id) => {
    const req = await fetch(`/api/admin/editdata?id=${id}&action=remove`);
    if (req.ok) {
      setNotifyData({ text: "The model has just been removed" });
      setNotifyVisible(true);
      await refreshModels(); // Обновляем список после удаления
    }
  };

  return (
    <div>
      <div className={css.items}>
        <AnimatePresence>
          {isLoading ? ( // Пока данные не загружены
            <LoadingComponent />
          ) : Array.isArray(modelsData) && modelsData.length > 0 ? (
            modelsData.map((el, i) => (
              <div key={i} className={css.itemWrapper}>
                {el.name}
                <div className={css.functions}>
                  <div onClick={() => editParams(el.id)}>Edit params</div>
                  <div onClick={() => editTitlePhoto(el.id)}>
                    Edit title photo
                  </div>
                  <div onClick={() => removeModel(el.id)}>Remove the model</div>
                </div>
              </div>
            ))
          ) : (
            <p>Нет данных о моделях</p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <ParamsEditor
          isEditorVisible={isEditorVisible}
          setEditorVisible={setEditorVisible}
          dataForEditing={dataForEditing}
          setIsLoading={setIsLoading}
        />
      </AnimatePresence>
      <AnimatePresence>
        <PhotosEditor
          isPhotosEditorVisible={isPhotosEditorVisible}
          setTitlePhotoEditorVisible={setTitlePhotoEditorVisible}
          setTitlePicture={setTitlePicture}
          titlePicture={titlePicture}
          editorCurrentId={editorCurrentId}
          setNotifyVisible={setNotifyVisible}
          setNotifyData={setNotifyData}
          setIsLoading={setIsLoading}
        />
      </AnimatePresence>
    </div>
  );
}

const ParamsEditor = ({
  isEditorVisible,
  setEditorVisible,
  dataForEditing,
}) => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [shoes, setShoes] = useState("");
  const [eyes, setEyes] = useState("");
  const [hair, setHair] = useState("");
  const [inst, setInst] = useState("");

  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape") {
        if (isEditorVisible) setEditorVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  }, [isEditorVisible]);

  return (
    isEditorVisible && (
      <motion.div
        className={css.ParamsEditorLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={css.ParamsEditorWrapper}>
          {Object.entries(dataForEditing).map((el, i) => (
            <div key={i} className={css.item}>
              <p>{el[0]}</p>
              {el[0] === "id" ? (
                <input defaultValue={el[1]} disabled />
              ) : (
                <input
                  defaultValue={el[1]}
                  onChange={(e) => {
                    switch (el[0]) {
                      case "name":
                        setName(e.target.value);
                        break;
                      case "height":
                        setHeight(e.target.value);
                        break;
                      case "bust":
                        setBust(e.target.value);
                        break;
                      case "waist":
                        setWaist(e.target.value);
                        break;
                      case "hip":
                        setHip(e.target.value);
                        break;
                      case "shoes":
                        setShoes(e.target.value);
                        break;
                      case "eyes":
                        setEyes(e.target.value);
                        break;
                      case "hair":
                        setHair(e.target.value);
                        break;
                      case "inst":
                        setInst(e.target.value);
                        break;
                      default:
                        break;
                    }
                  }}
                />
              )}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <div
              className={`${css.btn} ${css.save}`}
              onClick={() => {
                SendDataToDB(
                  dataForEditing.id,
                  name,
                  height,
                  bust,
                  waist,
                  hip,
                  shoes,
                  eyes,
                  hair,
                  inst
                );
                setEditorVisible(false);
              }}
            >
              Save
            </div>
            <div
              className={`${css.btn} ${css.cancel}`}
              onClick={() => setEditorVisible(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

const PhotosEditor = ({
  isPhotosEditorVisible,
  setTitlePhotoEditorVisible,
  titlePicture,
  setTitlePicture,
  editorCurrentId,
  setNotifyVisible,
  setNotifyData,
  setIsLoading,
}) => {
  const setPhoto = useRef();
  const [file, setFile] = useState(null);

  const handleFilesChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendPhoto = async () => {
    if (!file) return;

    try {
      const attachedPhoto = new FormData();
      attachedPhoto.append("photo", file); // Используем ключ "photo"
      attachedPhoto.append("id", editorCurrentId); // Добавляем id в FormData

      const reqPostImg = await fetch("/api/admin/settitlephoto", {
        method: "POST",
        body: attachedPhoto,
      });

      if (!reqPostImg.ok) {
        throw new Error(`Server error: ${reqPostImg.status}`);
      }

      const { message } = await reqPostImg.json();

      setNotifyVisible(true);
      setNotifyData({
        text: message,
        status: "ok",
      });
    } catch (error) {
      setNotifyVisible(true);
      setNotifyData({
        text: "Ошибка загрузки данных моделей",
        status: "error",
      });
      console.error("Upload error:", error);
    }
    setTitlePhotoEditorVisible(false);
    setTitlePicture(null);
    setFile(null);
    setIsLoading(false);
  };
  const clearFile = () => {
    setFile(null);
  };

  const cancelHandler = () => {
    clearFile();
    setTitlePhotoEditorVisible(false);
  };

  const saveHandler = () => {
    sendPhoto();
    setIsLoading(true);
  };

  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape") {
        if (isPhotosEditorVisible) cancelHandler();
      }
    };

    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  }, [isPhotosEditorVisible]);

  return (
    isPhotosEditorVisible && (
      <motion.div
        className={css.PhotosEditorLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>Avatar Editor</h2>
        <div className={css.PhotosEditorWrapper}>
          {titlePicture ? (
            <>
              <h3>That is the current title photo</h3>
              <img
                src={titlePicture}
                alt="avatar"
                className={css.currentTitlePhoto}
              />
            </>
          ) : (
            <h3>The avatar has not been set yet</h3>
          )}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div
              className={`${css.btn} ${css.set}`}
              onClick={() => setPhoto.current.click()}
            >
              Set title photo
            </div>
            <div
              className={`${css.btn} ${css.save}`}
              onClick={() => {
                saveHandler();
              }}
            >
              Save
            </div>
            <div
              className={`${css.btn} ${css.cancel}`}
              onClick={() => cancelHandler()}
            >
              Cancel
            </div>
          </div>
        </div>
        <div className={css.previewWraper}>
          {file && (
            <div className={css.titleImgPreview}>
              <img src={URL.createObjectURL(file)} alt="preview" />
              <div className={css.deleteImg} onClick={() => clearFile(null)}>
                🗑️
              </div>
            </div>
          )}
        </div>
        <input
          onChange={handleFilesChange}
          type="file"
          ref={setPhoto}
          style={{ display: "none" }}
        />
      </motion.div>
    )
  );
};

const SendDataToDB = async (
  id,
  name,
  height,
  bust,
  waist,
  hip,
  shoes,
  eyes,
  hair,
  inst
) => {
  const data = {};
  if (name) data.name = name;
  if (height) data.height = height;
  if (bust) data.bust = bust;
  if (waist) data.waist = waist;
  if (hip) data.hip = hip;
  if (shoes) data.shoes = shoes;
  if (eyes) data.eyes = eyes;
  if (hair) data.hair = hair;
  if (inst) data.inst = inst;

  const req = await fetch(`/api/admin/editdata?action=editParams&id=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export default Page;
