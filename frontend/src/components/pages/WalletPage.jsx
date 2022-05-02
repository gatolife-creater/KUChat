import React, { useState, useEffect } from "react";

import NavBar from "../parts/NavBar";
import TransactionTable from "../parts/TransactionTable";
import { QRCodeSVG } from "qrcode.react";

import getBalanceOfAddress from "../../js/getBalance";
import getTransactionsOfAddress from "../../js/getTransactions";
import { Link } from "react-router-dom";

const WalletPage = (props) => {
  const { blockchain } = props;
  const [address, setMessage] = useState("");
  useEffect(() => {
    fetch("/get-address")
      .then((res) => res.json())
      .then((data) => setMessage(data.public));
  }, []);

  useEffect(() => {
    document.title = "KUChat | Wallet";
  })

  let balance = 0;
  let transactions = [];

  balance = getBalanceOfAddress(blockchain, address);
  transactions = getTransactionsOfAddress(blockchain, address);

  return (
    <>
      <NavBar />
      <main>
        {address ? (
          <div className="container">
            <div className="card address-info">
              <h5 className="card-header text-truncate">
                Your Info
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{}}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  QR code
                </button>
              </h5>
              <div className="card-body">
                <h5 className="card-title">
                  <strong style={{ fontSize: "large" }}>
                    {address === "System" ? <>Supply:</> : <>Balance:</>}
                    {balance}
                  </strong>
                  KUC
                </h5>

                <hr />

                <h5 className="card-title">
                  <strong style={{ fontSize: "large" }}>Address:</strong>
                  <div class="text-truncate">{address}</div>
                </h5>

                <hr />

                <h5 className="card-title">
                  <strong style={{ fontSize: "large" }}>Transactions:</strong>
                </h5>
                <TransactionTable transactions={transactions} />
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      QR code
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" style={{ textAlign: "center" }}>
                    <QRCodeSVG value={address} />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <center>
            <h2>Please sign in or sign up.</h2>
            <Link to="/signin" className="btn btn-lg btn-primary mt-5">
              Sign in / Sign up
            </Link>
          </center>
        )}
      </main>
    </>
  );
};

export default WalletPage;
