import React from "react";
import { Link } from "react-router-dom";

const TransactionTable = (props) =>{

    const {transactions} = props;
    
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th-id" scope="col">#</th>
                        <th className="th-toAddress" scope="col">To</th>
                        <th className="th-fromAddress" scope="col">From</th>
                        <th className="th-timestamp" scope="col">Time</th>
                        <th className="th-amount" scope="col">Amt.</th>
                        <th className="th-message" scope="col">Msg.</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index)=>(
                        <tr>
                            <th className="td-id" scope="row">{index}</th>
                            <td className="td-toAddress"><Link to={`/search?address=${transaction.toAddress}`}>{transaction.toAddress}</Link></td>
                            <td className="td-fromAddress"><Link to={`/search?address=${transaction.fromAddress}`}>{transaction.fromAddress}</Link></td>
                            <td className="td-timestamp">{transaction.timestamp}</td>
                            <td className="td-amount">{transaction.amount}</td>
                            <td className="td-message">{transaction.message}</td>
                        </tr>
                    ))}
                </tbody>    
            </table>
        </>   
    )
}

export default TransactionTable;