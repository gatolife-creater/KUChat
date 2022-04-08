// このライブラリはオブジェクトを使うらしい
const SHA256 = require('crypto-js/sha256');

const EC = require("elliptic").ec;
//ビットコインのウォレットにも実際に使われるアルゴリズムらしい
const ec = new EC("secp256k1");


class Transaction {
    constructor(fromAddress, toAddress, amount, message = "No Message") {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.message = message;
        this.timestamp = Date.now();
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.message + this.timestamp).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;

        /** 
         * calculateHash()は this.previousHash, this.timestamp, this.transactionsを引数に取るから、
         * インスタンス生成時にハッシュを設定することができる
         * */
        this.hash = this.calculateHash();
        this.nonce = 0;
    }



    /**
     * これは前のブロックのハッシュ、取引された時間、取引の情報などをもとにハッシュを生成している。
     * つまりこれによって生成されるハッシュは、取引の要約というわけだ。
     */
    calculateHash() {
            /**
             * オブジェクトが返ってくるので文字列にする
             */
            return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
        }
        /**
         * 0の数でマイニングの難易度が決まってるっぽい
         * ex.) diffilculty = 3 --> ゼロの数が三個 
         */
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined:" + this.hash);
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

class Blockchain {
    constructor() {

        // thisというのはBlockchainの実態を参照しているらしい、
        // 今回のはiCryptocurrencyを参照
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock() {
        return new Block( /*"02/05/2022"*/ Date.now(), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        // null はシステムであることを示したい。
        const rewardTx = new Transaction("System", miningRewardAddress, this.miningReward, "Mining Reward");
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction) {

        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address");
        }

        if (transaction.toAddress === "System") {
            throw new Error("Cannot send to System");
        }

        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid transaction to chain");
        }

        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }
        // Making sure that the amount sent is not greater than existing balance
        const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        if (walletBalance < transaction.amount) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
    }

    /**
     * 仮想通貨は自分自身で保持している様に思われるが、
     * 実際はブロックチェーンにその保持量を問い合わせているらしい。
     * さて、ここには仮想通貨の量を調べたいアドレスを引数に取る。
     */
    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                } else if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    getTransactionsOfAddress(address) {
        let transactions = [];
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address || trans.toAddress === address) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }

    isChainValid() {
        /**
         * 一番最初のブロックはそれよりも前のブロックが存在しないので、
         * iは1から始める
         */
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) return false;

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;