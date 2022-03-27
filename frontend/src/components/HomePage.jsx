import React from "react";

import NavBar from "./NavBar";

const HomePage = (props) => {

    const {blockchain} = props;
    const tst= ["1","2","3"];
    return (
        <>
            <NavBar/>
            <main>
                <div className="container">
                    <div className="convert-area row justifycontent-start">
                        {blockchain.map((block,index)=>(
                            <div className="col-md-4 ms-auto">
                                <div className="card">
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage;

/**
 *  <main>
        <div class="container">
            <div class="convert-area row justify-content-start">
                {blockchain.map((block, index) =>
                    <div class="col-md-4 ms-auto">
                        <div class="card" onclick="showDetails(this);">
                            <div class="card-header">Block : <span class="block_number"><%= i %></span></div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item hash text-truncate"><span>Hash :</span> <br>
                                    <%= kucoin.chain[i].hash %>
                                </li>
                                <li class="list-group-item previousHash text-truncate"><span>Previous Hash :</span> <br>
                                    <%= kucoin.chain[i].previousHash %>
                                </li>
                                <li class="list-group-item nonce"><span>Nonce :</span> <br>
                                    <%= kucoin.chain[i].nonce %>
                                </li>
                                <li class="list-group-item timestamp"><span>Timestamp :</span> <br>
                                    <%= kucoin.chain[i].timestamp %>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <% } %>
            </div>
        </div>
    </main>
 */