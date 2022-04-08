import React from "react";

import NavBar from "./NavBar";

import getBalanceOfAddress from "../js/getBalance";

const WalletPage = (props) => {

    const {blockchain} = props;
    console.log(blockchain);
    
    let balance = 0;
    let address = "aaa";

    balance = getBalanceOfAddress(blockchain, address);
    
    console.log(balance);

    return (
        <>
            <NavBar/>
            <main>
            <ul className="list-group wallet-panel">
                <li className="list-group-item wallet-header" aria-current="true">Your Balance</li>
                <li className="list-group-item wallet-list text-truncate">Address : {address}
                </li>
                <li className="list-group-item wallet-list text-truncate">Amount : {balance}
                    <span style={{fontSize:"x-large"}}></span> KUC
                </li>
                <li className="list-group-item wallet-list convert-area">Transaction History : testHistory
                </li>
            </ul>
            </main>
        </>
    )
}

export default WalletPage;