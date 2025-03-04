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
  const [isAvatarEditorVisible, setAvatarEditorVisible] = useState(false);

  const getModelsData = async () => {
    try {
      const req = await fetch("/api/client/getdata?type=selectAll");
      if (!req.ok) {
        throw new Error(`Ошибка загрузки данных: ${req.status}`);
      }
      const { results } = await req.json();
      setModelsData(Array.isArray(results) ? results : []);
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
      return results;
    } catch (error) {
      return [];
    }
  };

  const parseImagesList = (arr) => {
    const title = arr.filter((el) => el.slice(38) === "title.jpg");
    return title.length > 0 ? title[0] : null;
  };

  const editParams = async (id) => {
    const req = await fetch(`/api/admin/editdata?id=${id}&action=params`);
    const { results } = await req.json();
    if (req.ok) {
      setDataForEditing(results[0]);
      setEditorVisible(true);
    }
  };

  const editAvatar = async (id) => {
    const imagesList = await getImagesList(id);
    const titlePictureState = parseImagesList(imagesList);
    setTitlePicture(titlePictureState);
    setEditorCurrentId(id);
    setAvatarEditorVisible(true);
  };

  const removeModel = async (id) => {
    const req = await fetch(`/api/admin/editdata?id=${id}&action=remove`);
    const { results } = await req.json();
    if (req.ok) {
      setNotifyData({ text: "The model has just been removed" });
      setNotifyVisible(true);
      await refreshModels(); // Обновляем список после удаления
    }
  };

  return (
    <div>
      <div className={css.items}>
        <AnimatePresence mode="wait">
          {modelsData === null ? ( // Пока данные не загружены
            <LoadingComponent />
          ) : Array.isArray(modelsData) && modelsData.length > 0 ? (
            modelsData.map((el, i) => (
              <div key={i} className={css.itemWrapper}>
                {el.name}
                <div className={css.functions}>
                  <div onClick={() => editParams(el.id)}>Edit params</div>
                  <div onClick={() => editAvatar(el.id)}>Edit title photo</div>
                  <div onClick={() => removeModel(el.id)}>Remove the model</div>
                </div>
              </div>
            ))
          ) : (
            <p>Нет данных о моделях</p>
          )}
        </AnimatePresence>
      </div>
      <ParamsEditor
        isEditorVisible={isEditorVisible}
        setEditorVisible={setEditorVisible}
        dataForEditing={dataForEditing}
      />
      <AvatarEditor
        isAvatarEditorVisible={isAvatarEditorVisible}
        setAvatarEditorVisible={setAvatarEditorVisible}
        titlePicture={titlePicture}
        editorCurrentId={editorCurrentId}
      />
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

  return (
    isEditorVisible && (
      <motion.div className={css.ParamsEditorLayout}>
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

const AvatarEditor = ({
  isAvatarEditorVisible,
  setAvatarEditorVisible,
  titlePicture,
  editorCurrentId,
}) => {
  const setPhoto = useRef();
  const [file, setFile] = useState(null);

  const handleFilesChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendPhoto = async () => {
    if (!file) return;
    const attachedPhoto = new FormData();
    attachedPhoto.append("file", file);
    const reqPostImg = await fetch(
      `/api/admin/settitlephoto?id=${editorCurrentId}`,
      {
        method: "POST",
        body: attachedPhoto,
      }
    );
  };

  return (
    isAvatarEditorVisible && (
      <div className={css.AvatarEditorLayout}>
        <h2>Avatar Editor</h2>
        <div className={css.AvatarEditorWrapper}>
          {titlePicture ? (
            <>
              <h3>That is the current avatar</h3>
              <img src={titlePicture} alt="avatar" style={{ height: "100%" }} />
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
                sendPhoto();
                setAvatarEditorVisible(false);
              }}
            >
              Save
            </div>
            <div
              className={`${css.btn} ${css.cancel}`}
              onClick={() => setAvatarEditorVisible(false)}
            >
              Cancel
            </div>
          </div>
        </div>
        <input
          onChange={handleFilesChange}
          type="file"
          ref={setPhoto}
          style={{ display: "none" }}
        />
      </div>
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
