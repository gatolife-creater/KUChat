import { Transaction } from "./transaction";
const { Blockchain } = require("./blockchain");



const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const kuchatBlockchain = new Blockchain();
console.log(kuchatBlockchain);

let privateKey = "go-go-go-this-is-test-key";
let fromAddress = ec.keyFromPrivate(privateKey).getPublic("hex");
let toAddress = "matthew.eth";
console.log(fromAddress, toAddress);


for (let i = 0; i < 3; i++) {
    kuchatBlockchain.minePendingTransactions(fromAddress);
}

console.log(kuchatBlockchain);
console.log(kuchatBlockchain.getBalanceOfAddress(fromAddress));

let transaction = new Transaction(fromAddress, toAddress, 100, "僕は先日");

transaction.signTransaction(ec.keyFromPrivate(privateKey));
// 取引を保留する
kuchatBlockchain.addTransaction(transaction);

for (let i = 0; i < 3; i++) {
    kuchatBlockchain.minePendingTransactions(fromAddress);
}

for (let block of kuchatBlockchain.chain) {
    console.log(block);
}