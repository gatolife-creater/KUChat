function getTransactionsOfAddress(blockchain, address) {
    let transactions = [];

    for (const block of blockchain) {
        for (const trans of block.transactions) {
            if (trans.fromAddress === address || trans.toAddress === address) {
                transactions.push(trans);
            }
        }
    }
    return transactions;
}

export default getTransactionsOfAddress;