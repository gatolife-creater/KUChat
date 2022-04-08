import React from "react";

import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

import getQueries from "../js/getQueries";

const BlockDetailsPage = (props) =>{
    const {blockchain} = props;
    let location = useLocation();
    let queries = getQueries(location);
    let transactions;
    if(blockchain[queries.number]){
        transactions = blockchain[queries.number].transactions;
        console.log(transactions);
    }

    return(
        <>
            <NavBar/>
            <main>

            </main>
        </>
    )
}

export default BlockDetailsPage;