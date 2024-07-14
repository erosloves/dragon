"use client";
import css from "./page.module.css";
import { useState, useEffect } from "react";

function Page() {
  const [modelsData, setModelsData] = useState([]);
  const getModelsData = async () => {
    const req = await fetch("/api/getdata?type=selectAll");
    const { results } = await req.json();
    setModelsData(results);
  };
  useEffect(() => {
    getModelsData();
  }, []);

  return (
    <div>
      <div className={css.items}>
        {modelsData.length > 0 &&
          modelsData.map((el, i) => (
            <div key={i} className={css.itemWrapper}>
              {el.name}
              <div className={css.functions}>
                <div>Edit params</div>
                <div>Edit the avatar</div>
                <div onClick={() => removeModel(el.id)}>Remove the model</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// fx

const removeModel = async (id) => {
  const req = await fetch(`/api/editdata?id=${id}&action=remove`);
  const { status } = await req.json();
  console.log(status);
};

export default Page;
