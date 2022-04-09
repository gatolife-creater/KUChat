import React from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";
import QRCodeReader from "./QRCodeReader";

const HomePage = (props) => {
    const {blockchain} = props;
    return (
        <>
            <NavBar/>
            <main>
                <div className="container">
                    <div className="row justifycontent-start">
                        {blockchain.map((block,index)=>(
                            <div className="col-md-4 ms-auto">
                                <div className="card clickable-card">
                                    <Link to={`/block_details?number=${index}`} style={{textDecoration:"none"}}>
                                        <div className="card-header">Block : <span className="block_number">{index}</span></div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item hash text-truncate"><span>Hash :</span><br />
                                                {block.hash}
                                            </li>
                                            <li className="list-group-item previousHash text-truncate"><span>Previous Hash :</span><br />
                                                {block.previousHash}
                                            </li>
                                            <li className="list-group-item nonce text-truncate"><span>Nonce :</span><br />
                                                {block.nonce}
                                            </li>
                                            <li className="list-group-item timestamp text-truncate"><span>Timestamp :</span><br />
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
            <QRCodeReader/>
        </>
    )
}

export default HomePage;