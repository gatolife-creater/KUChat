import React from "react";

import NavBar from "./NavBar";
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

    // if(blockchain[queries.number]){
    //     transactions = blockchain[queries.number].transactions;
    //     console.log(transactions);
    // }

    return(
        <>
            <NavBar/>
            <main>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">toAddress</th>
                            <th scope="col">fromAddress</th>
                            <th scope="col">Timestamp</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index)=>(
                            <tr>
                            <th scope="row">{index}</th>
                            <td><a href="/search?address=${toAddress}">{transaction.toAddress}</a></td>
                            <td><a href="/search?address=${fromAddress}">{transaction.fromAddress}</a></td>
                            <td>{transaction.timestamp}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.message}</td>
                        </tr>
                        ))}
                    </tbody>    
                </table>
            </main>
        </>
    )
}

export default BlockDetailsPage;