function getBalanceOfAddress(blockchain, address) {
    let balance = 0;

    for (const block of blockchain) {
        for (const trans of block.transactions) {
            if (trans.fromAddress === address) {
                balance -= Number(trans.amount);
            } else if (trans.toAddress === address) {
                balance += Number(trans.amount);
            }
        }
    }
    return balance;
}

export default getBalanceOfAddress;