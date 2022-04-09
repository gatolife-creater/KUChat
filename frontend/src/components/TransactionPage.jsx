import React from "react";

import NavBar from "./NavBar";

const TransactionPage = () => {
    return (
        <>
            <NavBar/>
            <main>
                <form method="post" style={{width: "70%", margin: "0 auto"}}>
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
                </form>
            </main>
        </>
    )
}

export default TransactionPage;