"use client";
import css from "./page.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { NotificationContext } from "@/contexts/notification";
import { motion } from "framer-motion";
import { type } from "os";
function Page() {
  const { setNotifyVisible, notifyData, setNotifyData } =
    useContext(NotificationContext);
  const [modelsData, setModelsData] = useState([]);
  const [dataForEditing, setDataForEditing] = useState([]);
  const [titlePicture, setTitlePicture] = useState();
  const [editorCurrentId, setEditorCurrentId] = useState();
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [isAvatarEditorVisible, setAvatarEditorVisible] = useState(false);

  const getModelsData = async () => {
    const req = await fetch("/api/client/getdata?type=selectAll");
    const { results } = await req.json();
    setModelsData(results);
  };
  useEffect(() => {
    getModelsData();
  }, []);

  // Получаем списко картинок, чтобы уточнить, есть ли уже title.jps

  const getImagesList = async (id) => {
    try {
      const apiUrlEndpoint = `/api/client/getimages?id=${id}`;
      const req = await fetch(apiUrlEndpoint);

      const { results } = await req.json();

      return results;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const parseImagesList = (arr) => {
    const title = arr.filter((el) => {
      if (el.slice(38) == "title.jpg") {
        return el;
      }
    });

    if (title.length > 0) {
      return title[0];
    }
  };

  // fx

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
    const titlePictureState = await parseImagesList(imagesList);
    setTitlePicture(titlePictureState);
    setEditorCurrentId(id);
    setAvatarEditorVisible(true);
  };

  useEffect(() => {
    console.log(titlePicture);
  }, [titlePicture]);

  const editPictures = (id) => console.log("edited");

  const removeModel = async (id) => {
    const req = await fetch(`/api/admin/editdata?id=${id}&action=remove`);
    const { results } = await req.json();
    if (req.ok) {
      setNotifyData({ text: "The model has just removed" });
      setNotifyVisible(true);
      getModelsData();
    }
    console.log(results);
  };

  return (
    <div>
      <div className={css.items}>
        {modelsData.length > 0 &&
          modelsData.map((el, i) => (
            <div key={i} className={css.itemWrapper}>
              {el.name}
              <div className={css.functions}>
                <div onClick={() => editParams(el.id)}>Edit params</div>
                <div
                  onClick={() => editAvatar(el.id)}
                  className={css.disabled}
                  title="This function will be available soon"
                >
                  Edit title photo
                </div>
                <div
                  onClick={() => editPictures(el.id)}
                  className={css.disabled}
                  title="This function will be available soon"
                >
                  Edit portfolio
                </div>

                <div onClick={() => removeModel(el.id)}>Remove the model</div>
              </div>
            </div>
          ))}
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
          {Object.entries(dataForEditing).map((el, i) => {
            return (
              <div key={i} className={css.item}>
                <p>{el[0]}</p>
                {el[0] == "id" ? (
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
            );
          })}
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
// AvatarEditor
const AvatarEditor = ({
  isAvatarEditorVisible,
  setAvatarEditorVisible,
  titlePicture,
  editorCurrentId,
}) => {
  const setPhoto = useRef();
  const [file, setFile] = useState({});
  const handleFilesChange = (e) => {
    setFile(e.target.files);
  };

  const sendPhoto = async () => {
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
            <h3>That is current avatar</h3>
          ) : (
            <h3>The avatar has not been set yet</h3>
          )}

          {/* buttons */}
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
            {/* <div className={`${css.btn} ${css.reset}`} onClick={() => {}}>
              Reset avatar
            </div> */}

            <div
              className={`${css.btn} ${css.save}`}
              onClick={() => {
                sendPhoto();
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
          {titlePicture ? (
            <img src={titlePicture} alt="avatar" style={{ height: "100%" }} />
          ) : null}
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
  name ? (data.name = name) : null;
  height ? (data.height = height) : null;
  bust ? (data.bust = bust) : null;
  waist ? (data.waist = waist) : null;
  hip ? (data.hip = hip) : null;
  shoes ? (data.shoes = shoes) : null;
  eyes ? (data.eyes = eyes) : null;
  hair ? (data.hair = hair) : null;
  inst ? (data.inst = inst) : null;

  const req = await fetch(`/api/admin/editdata?action=editParams&id=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const m = await req.json();
  console.log(m);
  // console.log(JSON.stringify(data));
};

export default Page;
