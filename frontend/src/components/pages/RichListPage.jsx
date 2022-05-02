import React,{useEffect} from "react";

import NavBar from "../parts/NavBar";

const RichListPage = () => {
  useEffect(() => {
    document.title = "KUChat | Rich List";
  })
  return (
    <>
      <NavBar />
    </>
  );
};

export default RichListPage;
