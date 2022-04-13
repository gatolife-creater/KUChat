const EC = require("elliptic").ec;

//ビットコインのウォレットにも実際に使われるアルゴリズムらしい
const ec = new EC("secp256k1");

const generateKeys = (password) => {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");
    return { public: publicKey, private: privateKey, password: password };
}

console.log(generateKeys("test"));

class Key {
    constructor() {

    }
    generateKeys(password) {
        const key = ec.genKeyPair();
        const publicKey = key.getPublic("hex");
        const privateKey = key.getPrivate("hex");
        return { public: publicKey, private: privateKey, password: password };
    }
}

module.exports.Key = Key;