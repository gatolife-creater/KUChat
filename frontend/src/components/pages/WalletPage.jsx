import React, {useState, useEffect} from "react";

import NavBar from "../parts/NavBar";
import { QRCodeSVG } from "qrcode.react";

import getBalanceOfAddress from "../../js/getBalance";

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
                                <li className="list-group-item wallet-header" aria-current="true">Your Info</li>
                                <li className="list-group-item wallet-list text-truncate">Address : {address}
                                </li>
                                <li className="list-group-item wallet-list text-truncate">Amount : {balance}
                                    <span style={{fontSize:"x-large"}}></span> KUC
                                </li>
                                <li className="list-group-item wallet-list">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Show QR Code
                                    </button>
                                </li>
                            </ul>
                        :   <center>
                                <h2>Please sign in or sign up.</h2>
                                <a href="/signin" className="btn btn-lg btn-primary mt-5">Sign in / Sign up</a>
                            </center>  
                            }

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">QR Code</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body" style={{textAlign:"center"}}>
                                    <QRCodeSVG value={address}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                            
            </main>
        </>
    )
}

export default WalletPage;