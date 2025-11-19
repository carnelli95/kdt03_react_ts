import TailButton from '../component/TailButton'
import TailBall from '../component/TailBall'
import { useState } from 'react'

export default function Lotto() {
    const[tags, setTags] = useState([])
    const[n, setN] = useState(0);

    const handleNum = () => {
      
      //set으로 선언
      let nums = new Set([]);

      while(nums.size < 7) {
        let n = Math.floor(Math.random() * 45 + 1) ;
        // set에서 추가
        nums.add(n);
      }
      
      nums = Array.from(nums)
      let bonus = nums.pop()
      
      nums.sort((a, b) => a - b)
      console.log(nums, bonus)

      // 태그 만들기
      let tm = nums.map(item => <TailBall n={item} key={item} />)
      tm = [...tm, <div className="w-20 h-20 
                                  text-4xl font-bold
                                  flex justify-center items-center"
                                  key="plus">+</div>]
      tm = [...tm, <TailBall n={bonus} key={bonus} />]
      // setN(num)

      // console.log(num)
      
      
      setTags(tm)
    }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className='flex justify-center items-center h-24'>     
        {tags}
      </div>
      <div className='mt-10'>
        <TailButton color = "blue"
                    caption ='로또번호생성' 
                    onHandle ={handleNum}/>
      </div>
    </div>
  )
}
