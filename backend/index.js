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

for (let i = 0; i < 7; i++) {
    kuchatBlockchain.minePendingTransactions(myWalletAddress);
}

transactionFlow(myKey, myWalletAddress, "aaaa", 100);


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
    res.json({ public: walletAddress, privateKey: privateKey });
});


app.post("/signin-attempt", (req, res) => {
    let { public, private } = req.body;
    for (let i = 0; i < keyArray.length; i++) {
        let key = keyArray[i];
        if (key.public === public && key.private === private) {
            req.session.public = key.public;
            req.session.private = key.private;
            res.send("success" + req.session.public);
        } else if (i + 1 === keyArray.length) {
            res.send("fail");
        }
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});



app.post("/transaction", (req, res) => {
    let { toAddress, message, amount } = req.body;
    transactionFlow(ec.keyFromPrivate(req.session.private), req.session.public, toAddress, amount, message);
    for (let i = 0; i < 7; i++) {
        kuchatBlockchain.minePendingTransactions(req.session.public);
    }
    res.redirect(`/transaction?address=${req.query.address}`);
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
});

/**
{
"public": "04960ab57b5d3a669319f196cba95267942577a7d5991115402bffe3692eb7023febcc5ccdf85f96c8755ac7d76ab165c73f54d502f028976ec60f4e014b3e7f55",
"privateKey": "f15a224a43ee8fe7a133b10b1fd213f8fd85895aa78ecce2fd7bb87bdde67495"
}
 */