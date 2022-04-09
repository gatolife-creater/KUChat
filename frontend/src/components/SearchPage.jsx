import React from "react";

import NavBar from "./NavBar";
import TransactionTable from "./TransactionTable";

import { useLocation } from "react-router-dom";

import getQueries from "../js/getQueries";
import getBalanceOfAddress from "../js/getBalance";
import getTransactionsOfAddress from "../js/getTransactions";

const SearchPage = (props) =>{

    const {blockchain} = props;

    let location = useLocation();
    let queries = getQueries(location);

    let balance = 0;
    let transactions = [];
    let address = queries.address;

    balance = getBalanceOfAddress(blockchain, address);
    transactions = getTransactionsOfAddress(blockchain, address);
    console.log(transactions);


    return(
        <>
            <NavBar/>
            <main>
                <div className="card address-info">
                    <h5 className="card-header text-truncate">Address: 
                        <span style={{fontSize: "small"}}>{address}</span>
                    </h5>
                    <div className="card-body">
                        <h5 className="card-title">
                        </h5>
                        <p className="card-text">
                                <strong style={{fontSize: "large"}}>{balance} </strong>KUC
                        </p>
                        <p className="card-text">Transactions:
                            <TransactionTable transactions={transactions}/>
                        </p>
                    </div>
                </div>
            </main>
        </>
        
    )
}
export default SearchPage;