import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { isLoginAtom } from '../atoms/Atoms'

export default function Header() {
  const isLogin = useAtomValue(isLoginAtom);
  console.log(isLogin);
  return (
   <header className='bg-yellow-600 text-white shadow-md'>
        <nav className='container h-16 mx-auto flex justify-between items-center'>
        <Link to="/" className='text-2xl font-bold text-blue-50 hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>KDT03</Link>
            <ul className='flex space-x-4'>
                <li>
                  <Link to="/"
                   className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>
                      홈
                  </Link>
                </li>
                {isLogin && <>
                <li>
                  <Link to="/TestTs"
                      className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>
                      테스트
                  </Link>
                </li>
                <li>
                  <Link to="/Lotto"
                      className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>
                      로또
                  </Link>
                </li>
              
                 <li>
                  <Link to="/Festival"
                      className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>
                      부산축제
                  </Link>
                </li>
               
                 <li>
                  <Link to="/TodoList"
                      className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-200'>
                      투두리스트
                  </Link>
                </li>
               
                </>}
            </ul>
        </nav>
    </header>
  )
}
