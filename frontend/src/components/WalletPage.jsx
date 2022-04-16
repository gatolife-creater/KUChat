import React, {useState, useEffect} from "react";

import NavBar from "./NavBar";

import getBalanceOfAddress from "../js/getBalance";

const WalletPage = (props) => {

    const {blockchain} = props;
    const [address, setMessage] = useState("");
    useEffect(()=>{
        fetch("/get-address")
        .then((res)=>res.json())
        .then((data)=>setMessage(data.public));
    },[])
    
    let balance = 0;

    balance = getBalanceOfAddress(blockchain, address);

    return (
        <>
            <NavBar/>
            <main>
                {address?   <ul className="list-group wallet-panel">
                                <li className="list-group-item wallet-header" aria-current="true">Your Balance</li>
                                <li className="list-group-item wallet-list text-truncate">Address : {address}
                                </li>
                                <li className="list-group-item wallet-list text-truncate">Amount : {balance}
                                    <span style={{fontSize:"x-large"}}></span> KUC
                                </li>
                            </ul>
                        :   <center>
                                <h2>Please sign in or sign up.</h2>
                                <a href="/signin" className="btn btn-lg btn-primary mt-5">Sign in / Sign up</a>
                            </center>  
                            }
                            
            </main>
        </>
    )
}

export default WalletPage;