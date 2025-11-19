import React, { useEffect, useRef, useState } from 'react';
import TailCard from '../component/TailCard';
import { Link , useSearchParams } from "react-router-dom";

export default function Festival() {
  const [tdata, setTdata] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]); 
  const [gu, setGu] = useState() ;

  const selRef = useRef();
  const [sParams] = useSearchParams() ;

  const handleChange = () => {
    setGu(selRef.current.value) ;
    if (selRef.current.value == ""){
      setSelectedArea([]) ;
      return ;
    } 
    let tm = tdata.filter(item => item.GUGUN_NM == selRef.current.value) ;
    setSelectedArea(tm) ;
  }

  const getFetchData = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = 
      `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${apiKey}&pageNo=1&numOfRows=45&resultType=json`;

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

    console.log(selRef.current.value)

    if (sParams.get("gu") != "") {
      console.log(sParams.get("gu"))
      selRef.current.value = sParams.get("gu") ;
      setGu(sParams.get("gu"));
      handleChange();
    }
    else {
      setGu('') ;
      setAreaFestival([]) ;
    }
  } , [sParams, areas]);

 useEffect(() => {
  if (tdata.length === 0) return;

  let tm = tdata.map(item => item.GUGUN_NM);
  tm = [...new Set(tm)].sort();

  setAreas(tm); 
}, [tdata]);



  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <h1 className="text-xl font-bold my-4">부산축제정보</h1>

      <div className="w-9/10 p-5 bg-gray-50 flex justify-center mb-4">
        <select name="sel1" ref={selRef}
          className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        >
          <option value="">--지역선택--</option>
          {areas.map(area => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 w-9/10 h-3/4 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedArea.map((item, idx) => (
                                          <Link to="/Festival/Contents"
                                          state= {{content:item}} 
                                          key={item.UC_SEQ + idx}
                                          >
                                        
          <TailCard
            key={item.UC_SEQ}
            imageUrl={item.MAIN_IMG_THUMB}
            title={item.MAIN_TITLE.replace('(한, 영, 중간, 중번, 일)','')}
            location={item.MAIN_PLACE}
            traffic={item.TRFC_INFO}
            day={item.USAGE_DAY_WEEK_AND_TIME}
          />
          </Link>
        ))}
      </div>
    </div>
  );
}
