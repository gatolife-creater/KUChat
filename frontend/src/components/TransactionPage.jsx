import React, {useState, useEffect} from "react";

import NavBar from "./NavBar";
import QRCodeReader from "./QRCodeReader";

const TransactionPage = () => {
    const [state, setState] = useState(false);
    console.log(state);
    return(
        <>
            <NavBar/>
            <main>
                <div className="container position-absolute top-50 start-50 translate-middle">
                    <form style={{width: "100%", margin: "0 auto"}}>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="メッセージ送信先のアドレスを入力" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-outline-primary" type="button" id="button-addon2">決定</button>
                    </div>
                    </form>
                    <button className="btn btn-success" style={{display:"block", width:"134px", height:"134px", margin:"0 auto", marginTop:"30px"}} onClick={() => setState(true)}>
                        <i class="bi bi-qr-code-scan" style={{fontSize:"5em"}}></i>
                    </button>
                </div>
                {state ? <QRCodeReader/> : <></>}
            </main>
        </>
    )
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