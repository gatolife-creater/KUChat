import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  let pathname = window.location.pathname;
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top mobile-fixed-bottom border-2 border-top border-warning shadow-lg">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand border-2 border-bottom border-warning logo"
          >
            KUChat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {pathname === "/" ? (
                  <Link
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                  >
                    ホーム
                  </Link>
                ) : (
                  <Link to={"/"} className="nav-link" aria-current="page">
                    ホーム
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {pathname === "/wallet" ? (
                  <Link to={"/wallet"} className="nav-link active">
                    ウォレット
                  </Link>
                ) : (
                  <Link to={"/wallet"} className="nav-link">
                    ウォレット
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {pathname === "/transaction" ? (
                  <Link to={"/transaction"} className="nav-link active">
                    取引
                  </Link>
                ) : (
                  <Link to={"/transaction"} className="nav-link">
                    取引
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {pathname === "/richlist" ? (
                  <Link to={"/richlist"} className="nav-link active">
                    ランキング
                  </Link>
                ) : (
                  <Link to={"/richlist"} className="nav-link">
                    ランキング
                  </Link>
                )}
              </li>
            </ul>
            <form className="d-flex" action="/search">
              <input
                className="form-control me-2 input-address"
                type="search"
                placeholder="アドレスを入力"
                aria-label="Search"
                name="address"
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
