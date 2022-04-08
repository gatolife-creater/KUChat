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
import BlockDetailsPage from './components/BlockDetailsPage';

const App = () => {
  const [blockchain, setMessage] = useState([]);

  const isFirstRender = useRef(false)

  useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
    isFirstRender.current = true
  }, [])

  useEffect(()=>{
    fetch("/api")
      .then((res)=>res.json())
      .then((data)=>setMessage(data.blockchain));
  },[])

  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage blockchain={blockchain}/>} exact/>
        <Route path='/wallet' element={<WalletPage blockchain={blockchain}/>} exact/>
        <Route path='/transaction' element={<TransactionPage/>} exact/>
        <Route path='/richlist' element={<RichListPage/>} exact/>
        <Route path='/block_details' element={<BlockDetailsPage blockchain={blockchain}/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;