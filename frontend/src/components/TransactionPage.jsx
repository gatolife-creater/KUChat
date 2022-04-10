import React, {useState, useEffect} from "react";

import NavBar from "./NavBar";
import ChatHeader from "./ChatHeader";
import QRCodeReader from "./QRCodeReader";

import { useLocation } from "react-router-dom";
import getQueries from "../js/getQueries";

const TransactionPage = () => {
    const [state, setState] = useState(false);
    let location = useLocation();
    let queries = getQueries(location);
    console.log(queries);

    if(!queries.address){
        return(
            <>
                <NavBar/>
                <main>
                    <div className="container position-absolute top-50 start-50 translate-middle">
                        <form style={{width: "100%", margin: "0 auto"}}>
                            <div class="input-group mb-3">
                                <input type="search" class="form-control" name="address" placeholder="メッセージ送信先のアドレスを入力"/>
                                <button class="btn btn-outline-primary" type="submit">決定</button>
                            </div>
                        </form>
                        <button className="btn btn-success" onClick={() => setState(!state)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"block", width:"134px", height:"134px", margin:"0 auto", marginTop:"30px"}}>
                            <i class="bi bi-qr-code-scan" style={{fontSize:"5em"}}></i>
                        </button>
                    </div>
    
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">QR Code リーダー</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {state ? <QRCodeReader/> : <></>}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                    <div className="chat-footer">
                        <form method="post">
                            <input type="text" class="form-control" name="toAddress" value={queries.address} style={{display:"none"}}/>
                            <input type="text" class="form-control" name="message"/>
                            <input type="text" class="form-control" name="amount" value="100" style={{display:"none"}}/>
                            <button type="submit" className="btn btn-success">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </div>
                </main>
            </>
        )
    }  
}

export default TransactionPage;

 /* <form method="post" style={{width: "70%", margin: "0 auto"}}>
                    <div className="mb-3">
                        <label htmlFor="kucaddress" className="form-label">Address</label>
                        <input className="form-control" id="kucaddress" name="toAddress"/>
                        <div className="form-text">送り先のKUCアドレスを入力してください。</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="amount" name="amount"/>
                            <span className="input-group-text">KUC</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <input className="form-control" id="message" name="message"/>
                        <div className="form-text">メッセージを入力してください。</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */