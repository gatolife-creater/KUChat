import React from "react";
import { QRCodeSVG } from "qrcode.react";

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


    return(
        <>
            <NavBar/>
            <main>
                <div className="container">
                    <div className="card address-info">
                        <h5 className="card-header text-truncate">Address: 
                            <span style={{fontSize: "small"}}>{address}</span>
                        </h5>
                        <div className="card-body">
                            <h5 className="card-title"><strong style={{fontSize: "large"}}>{balance} </strong>KUC</h5>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Show QR Code
                    </button>
                            {/* <p className="card-text">
                                    <strong style={{fontSize: "large"}}>{balance} </strong>KUC
                            </p> */}
                            <p className="card-text">Transactions:
                                <TransactionTable transactions={transactions}/>
                            </p>
                        </div>
                    </div>

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
                </div>
            </main>
        </>
        
    )
}
export default SearchPage;