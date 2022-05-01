import "./css/App.scss";
import "./css/TransactionTable.scss";
import "./css/Chat.scss";
import "./css/Signin.scss";
import "./css/Error.scss";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import HomePage from "./components/pages/HomePage";
import WalletPage from "./components/pages/WalletPage";
import TransactionPage from "./components/pages/TransactionPage";
import RichListPage from "./components/pages/RichListPage";
import BlockDetailsPage from "./components/pages/BlockDetailsPage";
import SearchPage from "./components/pages/SearchPage";
import SignupPage from "./components/pages/SignupPage";
import SigninPage from "./components/pages/SigninPage";
import ErrorPage from "./components/pages/ErrorPage";

const App = () => {
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
  }, []);

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
