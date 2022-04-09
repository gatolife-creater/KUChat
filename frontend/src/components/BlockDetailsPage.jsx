import React from "react";

import NavBar from "./NavBar";
import TransactionTable from "./TransactionTable";

import { useLocation } from "react-router-dom";

import getQueries from "../js/getQueries";

const BlockDetailsPage = (props) =>{
    const {blockchain} = props;
    let location = useLocation();
    let queries = getQueries(location);
    let transactions;

    try{
        transactions = blockchain[queries.number].transactions;
    }catch(e){
        transactions = [];
    }

    return(
        <>
            <NavBar/>
            <main>
                <TransactionTable transactions={transactions}/>
            </main>
        </>
    )
}

export default BlockDetailsPage;