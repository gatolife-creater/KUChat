const SHA256 = require('crypto-js/sha256');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const { Filter } = require("./filter");
const filter = new Filter();
filter.useFilteringList("jp");
filter.useFilteringList("en");

const { Morphology } = require("./morphologicalAnalysis");

class Transaction {
    /**
     * 
     * @param {string} fromAddress 
     * @param {string} toAddress  
     * @param {number} amount 
     * @param {string} message 
     */
    constructor(fromAddress, toAddress, amount, message = "No Message") {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.message = filter.clean(message);
        this.timestamp = Date.now();
        new Morphology(message).getWordsByRole("固有名詞").then((list) => {
            this.words = list;
        });
    }

    calculateHash() {
        return SHA256(
            this.fromAddress +
            this.toAddress +
            this.amount +
            this.message +
            this.timestamp +
            this.words
        ).toString();
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

module.exports.Transaction = Transaction;