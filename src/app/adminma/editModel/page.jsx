"use client";
import css from "./page.module.css";
import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "@/contexts/notification";
import { motion } from "framer-motion";
function Page() {
  const { setNotifyVisible, notifyData, setNotifyData } =
    useContext(NotificationContext);
  const [modelsData, setModelsData] = useState([]);
  const [dataForEditing, setDataForEditing] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const getModelsData = async () => {
    const req = await fetch("/api/getdata?type=selectAll");
    const { results } = await req.json();
    setModelsData(results);
  };
  useEffect(() => {
    getModelsData();
  }, []);

  // fx

  const editParams = async (id) => {
    const req = await fetch(`/api/editdata?id=${id}&action=params`);
    const { results } = await req.json();
    if (req.ok) {
      setDataForEditing(results[0]);
      setEditorVisible(true);
    }
  };

  const removeModel = async (id) => {
    const req = await fetch(`/api/editdata?id=${id}&action=remove`);
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
                <div>Edit the avatar</div>
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
    </div>
  );
}

const ParamsEditor = ({
  isEditorVisible,
  setEditorVisible,
  dataForEditing,
}) => {
  return (
    isEditorVisible && (
      <motion.div className={css.ParamsEditorLayout}>
        <div className={css.ParamsEditorWrapper}>
          {Object.entries(dataForEditing).map((el, i) => {
            return (
              <div key={i} className={css.item}>
                {" "}
                <p>{el[0]}</p>
                <input value={el[1]} />
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
            <div className={`${css.btn} ${css.save}`}>Save</div>
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

export default Page;
