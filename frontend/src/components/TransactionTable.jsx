import React from "react";

const TransactionTable = (props) =>{

    const {transactions} = props;
    
    return(
        <>
            <table class="table">
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
                            <td className="td-toAddress"><a href={`/search?address=${transaction.toAddress}`}>{transaction.toAddress}</a></td>
                            <td className="td-fromAddress"><a href={`/search?address=${transaction.fromAddress}`}>{transaction.fromAddress}</a></td>
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