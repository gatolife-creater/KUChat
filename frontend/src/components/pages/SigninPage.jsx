import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import NavBar from "../parts/NavBar";

const SigninPage = () => {

  useEffect(() => {
    document.title = "KUChat | Signin";
  })
  return (
    <>
      <NavBar />
      <main className="form-signin text-center">
        <form method="post" action="/signin-attempt" autocomplete="off">
          <img
            className="mb-4"
            src="https://pbs.twimg.com/profile_images/1366595750/3_400x400.jpg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-5 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              className="form-control"
              name="mnemonic"
              id="floatingInput"
              placeholder="Passphrase"
            />
            <label htmlFor="floatingInput">Passphrase</label>
          </div>

          <button className="mt-5 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3">
            No passphrase with you? Please <Link to="/signup">sign up</Link>.
          </p>
          <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
        </form>
      </main>
    </>
  );
};

export default SigninPage;
