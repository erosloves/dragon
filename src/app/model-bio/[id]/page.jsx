"use client";
import CreateSwiper from "@/components/Swiper/Swiper";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [modelData, setModelData] = useState([]);
  useEffect(() => {
    const getModel = async () => {
      // const apiUrlEndpoint = `http://localhost:3000/api/getdata`;
      const apiUrlEndpoint = `http://localhost:3000/api/getdata?type=selectById&id=${params.id}`;
      const req = await fetch(apiUrlEndpoint);
      const { results } = await req.json();
      console.log(results[0]);
      setModelData(results[0]);
    };
    getModel();
  }, [params.id]);
  return (
    <div>
      <div className="">
        <div className="params">
          <span className="name">{modelData.name}</span>
        </div>
      </div>
    </div>
  );
}
