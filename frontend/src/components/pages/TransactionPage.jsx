import React, {useState, useEffect} from "react";

import NavBar from "../parts/NavBar";
import ChatHeader from "../parts/ChatHeader";
import QRCodeReader from "../parts/QRCodeReader";

import { useLocation } from "react-router-dom";
import getQueries from "../../js/getQueries";
import getCommunicationHistory from "../../js/getCommunicationHistory";
import isURL from "../../js/isURL";

const TransactionPage = (props) => {
    const {blockchain} = props;

    const [state, setState] = useState(false);
    let location = useLocation();
    let queries = getQueries(location);

    const [rightAddress, setMessage] = useState("");
    useEffect(()=>{
        fetch("/get-address")
        .then((res)=>res.json())
        .then((data)=>setMessage(data.public));
    },[])

    const leftAddress = queries.address;

    let tmpTransactions = getCommunicationHistory(blockchain, leftAddress, rightAddress);

    if(!queries.address){
        return(
            <>
                <NavBar/>
                <main>
                    {rightAddress?  <>
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
                                    </>
                                :   <>
                                        <center>
                                            <h2>Please sign in or sign up.</h2>
                                            <a href="/signin" className="btn btn-lg btn-primary mt-5">Sign in / Sign up</a>
                                        </center> 
                                    </>}
                    
                </main>
            </>
        )
    }else if(queries.address){
        return(
            <>
                {rightAddress?  <>
                                    <ChatHeader className="chat-header" address={queries.address}/>
                                    <main className="chat-main">
                                        {tmpTransactions.map((transaction)=>(
                                            transaction.fromAddress === rightAddress ? <div className="chat-sentence chat-sentence-right">
                                                                                            {isURL(transaction.message)? <a href={transaction.message} target="_blank">{transaction.message}</a>
                                                                                                                    : <>{transaction.message}</>}
                                                                                        </div>
                                                                                    : <div className="chat-sentence chat-sentence-left">{transaction.message}</div> 
                                        ))}
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
                            :   <>
                                    <ChatHeader className="chat-header" address={queries.address}/>
                                    <main className="chat-main">
                                        <center>
                                            <h2 style={{color:"white"}}>Please sign in or sign up.</h2>
                                            <a href="/signin" className="btn btn-lg btn-success mt-5" style={{color:"white"}}>Sign in / Sign up</a>
                                        </center> 
                                    </main>
                                </>}
                
            </>
        )
    }  
}

export default TransactionPage;