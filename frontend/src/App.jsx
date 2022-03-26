import './App.css';
import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import {useState, useEffect} from "react";

import HomePage from './components/HomePage';
import WalletPage from './components/WalletPage';
import TransactionPage from './components/TransactionPage';
import RichListPage from './components/RichList';

const App = () => {

  const [message, setMessage] = useState("");
  useEffect(()=>{
    fetch("/api")
    .then((res)=>res.json())
    .then((data)=>setMessage(data.message));
  },[])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} exact/>
        <Route path='/wallet' element={<WalletPage/>}/>
        <Route path='/transaction' element={<TransactionPage/>}/>
        <Route path='/richlist' element={<RichListPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;