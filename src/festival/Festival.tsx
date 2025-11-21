import { useEffect, useRef, useState } from "react";
import TailCard from "../component/TailCard";
import { Link, useSearchParams } from "react-router-dom";
import type { FestivalType } from "./festivaltype";

export default function Festival() {
  const [tdata, setTdata] = useState<FestivalType[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<FestivalType[]>([]);
  const [gu, setGu] = useState<string | null>();

  const selRef = useRef<HTMLSelectElement>(null);
  const [sParams] = useSearchParams();

  const handleChange = () => {
    if (!selRef.current) return;

    setGu(selRef.current.value);

    if (selRef.current.value === "") {
      setSelectedArea([]);
      return;
    }

    const tm = tdata.filter((item) => item.GUGUN_NM === selRef.current!.value);
    setSelectedArea(tm);
  };

  const getFetchData = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${apiKey}&pageNo=1&numOfRows=45&resultType=json`;

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setTdata(data.getFestivalKr?.item || []);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    const guParam = sParams.get("gu");
    if (guParam) {
      if (selRef.current) selRef.current.value = guParam;
      setGu(guParam);
      handleChange();
    } else {
      setGu("");
      setSelectedArea([]);
    }
  }, [sParams, areas]);

  useEffect(() => {
    if (tdata.length === 0) return;

    const tm = [...new Set(tdata.map((item) => item.GUGUN_NM))].sort();
    setAreas(tm);
  }, [tdata]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-xl font-bold my-4">부산축제정보</h1>

      <div className="w-9/10 p-5 bg-gray-50 flex justify-center mb-4">
        <select
          name="sel1"
          ref={selRef}
          className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        >
          <option value="">--지역선택--</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 w-9/10 h-3/4 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedArea.map((item, idx) => (
          <Link
            to="/Festival/Contents"
            state={{ content: item }}
            key={item.UC_SEQ + idx}
          >
            <TailCard
              imageUrl={item.MAIN_IMG_THUMB}
              title={item.MAIN_TITLE.replace("(한, 영, 중간, 중번, 일)", "")}
              location={item.MAIN_PLACE}
              traffic={item.TRFC_INFO}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
