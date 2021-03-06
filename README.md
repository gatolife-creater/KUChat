# KUChat

`KUChat` は、ブロックチェーンを用いたチャット開発をするプロジェクトです。


ブロックチェーンの長所、**「匿名性」「情報の透明性」** を活用し、すべての生徒が **「匿名で質問」** でき、なおかつ **「他の生徒の質問」** を閲覧できるようなチャットの開発を目的としています。

その他、学習活動をより活発化させるために、簡易的な仮想通貨 `KUCoin` を用意しています。先生へのお礼として `KUCoin` をプレゼントしたり、部活動・委員会活動への貢献の報酬として `KUCoin` を送るなど、さまざまな用途が考えられます。

なお、匿名性と利便性を両立するため、メッセージの送信及び `KUCoin` の送金には、主にQRコードを使用します。<br><br>

### 共同開発者の募集
KUChatプロジェクトは共同開発をしていただける方を募集しています。
興味のある方は、以下の募集要項をご確認の上 <gatolifechannel@gmail.com> からご連絡ください。

メールが確認出来次第、具体的な方針や分担についてご連絡いたします。<br><br><br><br>

## フロントエンドの募集

フロントエンドでは、主にウェブサイトのデザインを行なっていただきます。

初めて使うユーザーでも、感覚的に使用することができるようなサイト設計。我が校のイメージとマッチするような配色を目指します。

必要となる知識は以下の通りです。

* HTML && CSS -- ウェブサイトの構成や配色などのデザインに使用します。
* (JavaScript) -- ウェブサイトに動きをつけるのに使用します。 
* (Node.js)  -- バックエンドと連携を取る際に使用します。
* (React.js) -- ウェブサイトの構成及びデザインを動的に変更する際に使用します。<br><br><br><br>


## バックエンドの募集

バックエンドでは、主にブロックチェーンやチャット本体の開発を行なっていただきます。

必要となる知識は以下の通りです。

* JavaScript -- バックエンド開発の基礎です。
* Node.js -- バックエンド開発の基礎です。
* (Express) -- バックエンド開発の基礎です。
* (SQL) --  ユーザー情報を整理する際に使用します。
* ブロックチェーンに関する基礎的な知識
<br><br><br><br>


## APIの利用について

KUChatでは、ブロックチェーンの取引履歴を一時的に公開しています。

https://front-react-back-node-jp.herokuapp.com/api にて公開していますので、フロントエンドの開発にお役立てください。<br><br><br><br>

## APIの利用手引き

APIの利用方法について簡単に説明いたします。ここではNode.jsを用います。

```javascript
let blockchainVar;

fetch("https://front-react-back-node-jp.herokuapp.com/api")
      .then((res) => res.json())
      .then((data) => blockchainVar = data.blockchain);

console.log(blockchainVar):
```
<br><br><br><br>


## KUChatの構成（2022/04/04時点）

* フロントエンド

    * React.js

    * Bootstrap

* バックエンド

    * Express

* ブロックチェーン

    * コンセンサスアルゴリズム : PoW

    * ハッシュ関数 : SHA-256

    * 楕円曲線暗号 : secp256k1

