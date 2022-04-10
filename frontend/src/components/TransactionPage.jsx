import React, {useState, useEffect} from "react";

import NavBar from "./NavBar";
import ChatHeader from "./ChatHeader";
import QRCodeReader from "./QRCodeReader";

import { useLocation } from "react-router-dom";
import getQueries from "../js/getQueries";
import getCommunicationHistory from "../js/getCommunicationHistory";

const TransactionPage = (props) => {
    const {blockchain} = props;

    const [state, setState] = useState(false);
    let location = useLocation();
    let queries = getQueries(location);


    let tmpAddress2 = queries.address;
    let tmpAddress1 = "049698b1d7c63758d00ae039998a51a50a55f02738182ede155f0a720c0c1b705ab3b0c277b4aec32efef2ccfb52e986918b87968dea486941fe9f73e92f7ca75e";

    let tmpTransactions = getCommunicationHistory(blockchain, tmpAddress2, tmpAddress1);
    console.log(tmpTransactions);

    if(!queries.address){
        return(
            <>
                <NavBar/>
                <main>
                    <div className="container position-absolute top-50 start-50 translate-middle">
                        <form style={{width: "100%", margin: "0 auto"}}>
                            <div className="input-group mb-3">
                                <input type="search" className="form-control" name="address" placeholder="メッセージ送信先のアドレスを入力"/>
                                <button className="btn btn-outline-primary" type="submit">決定</button>
                            </div>
                        </form>
                        <button className="btn btn-success" onClick={() => setState(!state)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"block", width:"134px", height:"134px", margin:"0 auto", marginTop:"30px"}}>
                            <i className="bi bi-qr-code-scan" style={{fontSize:"5em"}}></i>
                        </button>
                    </div>
    
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">QR Code リーダー</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {state ? <QRCodeReader/> : <></>}
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
    }else if(queries.address){
        return(
            <>
                <ChatHeader className="chat-header" address={queries.address}/>
                <main>
                    <div className="chat-main">
                        {tmpTransactions.map((transaction)=>(
                            transaction.fromAddress === tmpAddress1 ? <div style={{backgroundColor:"green"}}>{transaction.message}</div>:<div style={{backgroundColor:"gray"}}>{transaction.message}</div> 
                        ))}
                    </div>
                </main>
                <footer>
                    <div className="chat-footer">
                        <form method="post">
                            <input type="text" className="form-control" name="toAddress" value={queries.address} style={{display:"none"}}/>
                            <input type="text" className="form-control" name="message"/>
                            <input type="text" className="form-control" name="amount" value="100" style={{display:"none"}}/>
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </div>
                </footer>
            </>
        )
    }  
}

export default TransactionPage;