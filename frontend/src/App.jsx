import "./css/App.scss";
import "./css/TransactionTable.scss";
import "./css/Chat.scss";
import "./css/Signin.scss";
import "./css/Error.scss";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState, useEffect, useReducer, useRef } from "react";

import HomePage from "./components/pages/HomePage";
import WalletPage from "./components/pages/WalletPage";
import TransactionPage from "./components/pages/TransactionPage";
import RichListPage from "./components/pages/RichListPage";
import BlockDetailsPage from "./components/pages/BlockDetailsPage";
import SearchPage from "./components/pages/SearchPage";
import SignupPage from "./components/pages/SignupPage";
import SigninPage from "./components/pages/SigninPage";
import ErrorPage from "./components/pages/ErrorPage";

import Gun from 'gun';

const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})

// create the initial state to hold the messages
const initialState = {
  messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

const App = () => {

  // the form state manages the form input for creating a new message
  const [formState, setForm] = useState({
    name: '', message: ''
  })

   // initialize the reducer & state for holding the messages array
   const [state, dispatch] = useReducer(reducer, initialState)

  const [blockchain, setMessage] = useState([]);

  const isFirstRender = useRef(false);

  useEffect(() => {
    // このeffectは初回レンダー時のみ呼ばれるeffect
    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.blockchain));
      const messages = gun.get('messages')
      messages.map().on(m => {
        dispatch({
          name: m.name,
          message: m.message,
          createdAt: m.createdAt
        })
      })
  }, []);


  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const messages = gun.get('messages')
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now()
    })
    setForm({
      name: '', message: ''
    })
  }

  // update the form state as the user types
  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage blockchain={blockchain} />} exact />
        <Route
          path="/wallet"
          element={<WalletPage blockchain={blockchain} />}
          exact
        />
        <Route
          path="/transaction"
          element={<TransactionPage blockchain={blockchain} />}
          exact
        />
        <Route path="/richlist" element={<RichListPage />} exact />
        <Route
          path="/block_details"
          element={<BlockDetailsPage blockchain={blockchain} />}
          exact
        />
        <Route
          path="/search"
          element={<SearchPage blockchain={blockchain} />}
          exact
        />
        <Route path="/signup" element={<SignupPage />} exact />
        <Route path="/signin" element={<SigninPage />} exact />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
