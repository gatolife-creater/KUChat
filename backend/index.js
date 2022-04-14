const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3006;

const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;

//ビットコインのウォレットにも実際に使われるアルゴリズムらしい
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const myKey = ec.keyFromPrivate("a1824ada2af9f5f2f9884e7e3444491fae672d0965e36f04c179ed3398e6883e");
const walletAddress = key.getPublic("hex");
const myWalletAddress = myKey.getPublic("hex");　
// hexはおそらく16進数のこと。実際にmyWalletAddressは16進数になっている。

// ブロックチェーンを生成
const kuchatBlockchain = new Blockchain();

const addressArray = [];

function transactionFlow(sign, fromWalletAddress, toWalletAddress, amount, message) {
    // 取引をする
    let tmptx = new Transaction(fromWalletAddress, toWalletAddress, amount, message);
    // 署名する
    tmptx.signTransaction(sign);
    // 取引を保留する
    kuchatBlockchain.addTransaction(tmptx);
}

for (let i = 0; i < 7; i++) {
    kuchatBlockchain.minePendingTransactions(myWalletAddress);
}

transactionFlow(myKey, myWalletAddress, "aaaa", 100);


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/api", (req, res) => {
    res.json({ blockchain: kuchatBlockchain.chain });
});

app.get("/generate-address", (req, res) => {
    const key = ec.genKeyPair();

    const privateKey = key.getPrivate("hex");
    const walletAddress = key.getPublic("hex");
    addressArray.push({ private: privateKey, public: walletAddress });
    res.json({ public: walletAddress });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});



app.post("/transaction", (req, res) => {
    let { toAddress, message, amount } = req.body;
    transactionFlow(myKey, myWalletAddress, toAddress, amount, message);
    for (let i = 0; i < 7; i++) {
        kuchatBlockchain.minePendingTransactions(myWalletAddress);
    }
    res.redirect(`/transaction?address=${req.query.address}`);
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
});