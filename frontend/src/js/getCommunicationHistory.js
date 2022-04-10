function getCommunicationHistory(blockchain, address1, address2) {
    let transactions = [];

    for (const block of blockchain) {
        for (const trans of block.transactions) {
            if (trans.fromAddress === address1 && trans.toAddress === address2 ||
                trans.fromAddress === address2 && trans.toAddress === address1) {
                transactions.push(trans);
            }
        }
    }
    return transactions;
}

export default getCommunicationHistory;