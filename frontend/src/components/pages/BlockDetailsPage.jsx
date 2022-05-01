import React from "react";

import NavBar from "../parts/NavBar";
import TransactionTable from "../parts/TransactionTable";

import { useLocation } from "react-router-dom";

import getQueries from "../../js/getQueries";

const BlockDetailsPage = (props) => {
  const { blockchain } = props;
  let location = useLocation();
  let queries = getQueries(location);
  let transactions;

  try {
    transactions = blockchain[queries.number].transactions;
  } catch (e) {
    transactions = [];
  }

  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <TransactionTable transactions={transactions} />
        </div>
      </main>
    </>
  );
};

export default BlockDetailsPage;
