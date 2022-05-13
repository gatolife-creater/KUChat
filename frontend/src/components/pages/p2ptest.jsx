import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import NavBar from "../parts/NavBar";

// initialize gun locally
const gun = Gun({
  peers: ["http://localhost:3007/gun"],
});

const PeerToPeer = (props) => {
  const { blockchain } = props;
  gun.get("blockchain").put({
    blockchain: blockchain,
  });
  gun.get("blockchain").on((data, key) => {
    console.log("realtime updates:", JSON.parse(data.blockchain));
  });

  setInterval(() => {
    gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
  }, 10000);

  return (
    <>
      <NavBar />
      <main>peer to peer messages</main>
    </>
  );
};

export default PeerToPeer;
