const express = require('express')
const app = express()
const session = require("express-session");
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
console.log(key);
// hexはおそらく16進数のこと。実際にmyWalletAddressは16進数になっている。

// ブロックチェーンを生成
const kuchatBlockchain = new Blockchain();

const keyArray = [];

function transactionFlow(sign, fromWalletAddress, toWalletAddress, amount, message) {
    // 取引をする
    let tmptx = new Transaction(fromWalletAddress, toWalletAddress, amount, message);
    // 署名する
    tmptx.signTransaction(sign);
    // 取引を保留する
    kuchatBlockchain.addTransaction(tmptx);
}


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

app.get("/api", (req, res) => {
    res.json({ blockchain: kuchatBlockchain.chain });
});

app.get("/generate-address", (req, res) => {
    const key = ec.genKeyPair();

    const privateKey = key.getPrivate("hex");
    const walletAddress = key.getPublic("hex");
    kuchatBlockchain.minePendingTransactions(walletAddress);
    keyArray.push({ private: privateKey, public: walletAddress });
    res.json({ public: walletAddress, private: privateKey });
});


app.post("/signin-attempt", (req, res) => {
    let { public, private } = req.body;
    for (let i = 0; i < keyArray.length; i++) {
        let key = keyArray[i];
        if (key.public === public && key.private === private) {
            req.session.public = key.public;
            req.session.private = key.private;
            res.redirect("/");
        } else if (i + 1 === keyArray.length) {
            res.send("fail");
        }
    }
});

app.get("/get-address", (req, res) => {
    res.json({ public: req.session.public });
});

app.post("/transaction", (req, res) => {
    let { toAddress, message, amount } = req.body;
    transactionFlow(ec.keyFromPrivate(req.session.private), req.session.public, toAddress, amount, message);
    for (let i = 0; i < 7; i++) {
        kuchatBlockchain.minePendingTransactions(req.session.public);
    }
    res.redirect(`/transaction?address=${req.query.address}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});




app.listen(port, () => {
    console.log(`listening on *:${port}`);
});