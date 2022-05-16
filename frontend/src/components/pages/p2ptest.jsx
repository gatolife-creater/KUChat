import { useState, useEffect } from "react";
import Gun from "gun";
import NavBar from "../parts/NavBar";
import { Link } from "react-router-dom";

import { Blockchain } from "./../../blockchain/blockchain";
import { Transaction } from "./../../blockchain/transaction";

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const kuchatBlockchain = new Blockchain();

const gun = Gun({
  peers: ["http://localhost:3007/gun"],
});

const PeerToPeer = (props) => {
  const [count, setCount] = useState(0);

  gun.get("blockchain").on((data, key) => {
    console.log("realtime updates:", JSON.parse(data.blockchain));
  });

  const createTransaction = () => {
    let privateKey = "go-go-go-this-is-test-key";
    let fromAddress = ec.keyFromPrivate(privateKey).getPublic("hex");
    let toAddress = "matthew.eth";

    kuchatBlockchain.minePendingTransactions(fromAddress);

    let transaction = new Transaction(fromAddress, toAddress, 100, "僕は先日");

    transaction.signTransaction(ec.keyFromPrivate(privateKey));
    // 取引を保留する
    kuchatBlockchain.addTransaction(transaction);
    kuchatBlockchain.minePendingTransactions(fromAddress);
    gun.get("blockchain").put(JSON.stringify(kuchatBlockchain));
    setCount(count + 1);
  };

  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <main>
        <button className="btn btn-primary" onClick={createTransaction}>
          create transaction
        </button>
        <div className="container">
          <div className="row justifycontent-start">
            {kuchatBlockchain.chain.map((block, index) => (
              <div className="col-md-4 ms-auto">
                <div className="card clickable-card">
                  <Link
                    to={`/block_details?number=${index}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card-header">
                      Block : <span className="block_number">{index}</span>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item hash text-truncate">
                        <span>Hash :</span>
                        <br />
                        {block.hash}
                      </li>
                      <li className="list-group-item previousHash text-truncate">
                        <span>Previous Hash :</span>
                        <br />
                        {block.previousHash}
                      </li>
                      <li className="list-group-item nonce text-truncate">
                        <span>Nonce :</span>
                        <br />
                        {block.nonce}
                      </li>
                      <li className="list-group-item timestamp text-truncate">
                        <span>Timestamp :</span>
                        <br />
                        {block.timestamp}
                      </li>
                    </ul>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default PeerToPeer;
