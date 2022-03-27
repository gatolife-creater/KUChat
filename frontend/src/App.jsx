import './App.css';
import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import {useState, useEffect, useRef} from "react";

import HomePage from './components/HomePage';
import WalletPage from './components/WalletPage';
import TransactionPage from './components/TransactionPage';
import RichListPage from './components/RichList';

const App = () => {
  const [message, setMessage] = useState([]);

  const isFirstRender = useRef(false)

  useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
    isFirstRender.current = true
  }, [])

  useEffect(()=>{
    if(isFirstRender.current) { // 初回レンダー判定
      isFirstRender.current = false // もう初回レンダーじゃないよ代入
    }else{
      fetch("/api")
      .then((res)=>res.json())
      .then((data)=>setMessage(data));
    }
  },[])

  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage blockchain={message}/>} exact/>
        <Route path='/wallet' element={<WalletPage/>}/>
        <Route path='/transaction' element={<TransactionPage/>}/>
        <Route path='/richlist' element={<RichListPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;