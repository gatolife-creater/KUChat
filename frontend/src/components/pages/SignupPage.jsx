import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../parts/NavBar";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SignupPage = () => {
  const [message, setMessage] = useState("");
  const [publicClickboard, setPublicClickboardState] = useState(false);

  const generateAddress = () => {
    fetch("/generate-address")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  };

  return (
    <>
      <NavBar />
      <main className="form-signin text-center">
        <img
          className="mb-4"
          src="https://pbs.twimg.com/profile_images/1366595750/3_400x400.jpg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        {message.mnemonic ? (
          <>
            <div class="input-group mb-3">
              <span class="input-group-text">Passphrase</span>
              <input
                type="text"
                class="form-control"
                value={message.mnemonic}
                readOnly="true"
              />
              <CopyToClipboard text={message.mnemonic}>
                {publicClickboard ? (
                  <span className="input-group-text">Copied</span>
                ) : (
                  <span
                    className="input-group-text"
                    onClick={() => setPublicClickboardState(true)}
                  >
                    Copy
                  </span>
                )}
              </CopyToClipboard>
            </div>
          </>
        ) : (
          <button
            onClick={generateAddress}
            className="mt-5 btn btn-lg btn-primary"
            type="button"
          >
            Sign up
          </button>
        )}

        <p className="mt-5 mb-3">
          Already have passphrase? Please <Link to="/signin">sign in</Link>.
        </p>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
      </main>
    </>
  );
};

export default SignupPage;
