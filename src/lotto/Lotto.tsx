import TailButton from '../component/TailButton'
import TailBall from '../component/TailBall'
import React, { useState } from 'react'

export default function Lotto() {
  const [tags, setTags] = useState<React.ReactElement[]>([])

  const handleNum = () => {
    let nums : Set<number> = new Set([])

    while (nums.size < 7) {
      nums.add(Math.floor(Math.random() * 45) + 1)
    }

    const numArr = Array.from(nums)
    const bonus = numArr.pop()!  
    numArr.sort((a, b) => a - b)

    let tm = numArr.map(item => <TailBall n={item} key={item} />)
    tm = [...tm,
      <div
        className="w-20 h-20 text-4xl font-bold flex justify-center items-center"
        key="plus"
      >+</div>,
      <TailBall n={bonus} key={bonus} />
    ]

    setTags(tm)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className='flex justify-center items-center h-24'>
        {tags}
      </div>
      <div className='mt-10'>
        <TailButton
          color="blue"
          caption='로또번호생성'
          onHandle={handleNum}
        />
      </div>
    </div>
  )
}
