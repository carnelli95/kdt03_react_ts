import { useLocation, useNavigate } from "react-router-dom";
import TailButton from '../component/TailButton';
import type { FestivalType } from "./festivaltype";

interface LocationState {
  content: FestivalType;
}

export default function FestivalContents() {
  const location = useLocation();
  const state = location.state as LocationState; 
  const item = state.content;

  const kakaoMapUrl = `https://map.kakao.com/link/map/${item?.MAIN_PLACE.replace(',', '').replace(' ', '')},${item?.LAT},${item?.LNG}`;

  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/Festival?gu=${item.GUGUN_NM}`);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <p className='text-2xl font-bold mt-4'>{item.MAIN_TITLE}</p>

      <div className='flex flex-row items-center justify-center'>
        <div className='w-1/3 flex justify-center'>
          <img
            src={item.MAIN_IMG_THUMB}
            alt={item.MAIN_TITLE}
            className='rounded-lg shadow-md w-full h-auto'
          />
        </div>

        <div className='flex flex-col w-full h-full'>
          <div className='flex flex-row items-center'>
            <span className='font-semibold text-gray-600'>축제 구군:</span>
            <span className='text-lg'>{item.GUGUN_NM}</span>
          </div>
          <div className='flex flex-row items-center'>
            <span className='font-semibold text-gray-600'>주소:</span>
            <span className='text-lg'>{item.ADDR1}</span>
          </div>
          <div className='flex flex-row items-center'>
            <span className='font-semibold text-gray-600'>연락처:</span>
            <span className='text-lg'>{item.CNTCT_TEL}</span>
          </div>
          <div className='flex flex-row items-center'>
            <span className='font-semibold text-gray-600'>홈페이지:</span>
            <a
              href={kakaoMapUrl}
              target="_blank"
              className="bg-amber-300 p-2 rounded-sm mx-4"
            >
              카카오지도보기
            </a>
          </div>
          <div className='flex flex-row items-center'>
            <span className='font-semibold text-gray-600'>상세내용:</span>
            <span className='text-lg'>{item.ITEMCNTNTS}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <TailButton caption="목록으로" color="blue" onHandle={handleHome} />
      </div>
    </div>
  );
}
