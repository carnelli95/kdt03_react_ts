import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import Lotto from './lotto/Lotto'
import Festival from './festival/Festival'
import FestivalContents from './festival/FestivalContents'
import TodoList from './todo/TodoList'
import Login from './Login'
import TestTs from './test_ts/TestTs'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="container mx-auto flex flex-col grow overflow-y-auto h-fu">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Lotto" element={<Lotto />} />
            <Route path="/Festival" element={<Festival />} />
            <Route path="/Festival/Contents" element={<FestivalContents />} />
            <Route path="/TodoList" element={<TodoList />} />
            <Route path="/TestTs" element={<TestTs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
