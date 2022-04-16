import React from "react";

const SignupPage = () => {
    return(
            <main className="form-signin text-center">
                <form method="post" action="/signin-attempt" autocomplete="off">
                    <img className="mb-4" src="https://pbs.twimg.com/profile_images/1366595750/3_400x400.jpg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                
                    <div className="form-floating">
                        <input className="form-control" name="public" id="floatingInput" placeholder="Address"/>
                        <label htmlFor="floatingInput">Address</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" name="private" id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                
                    <button className="mt-5 w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3">No address with you? Please <a href="/signup">sign up</a>.</p>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
    )
}

export default SignupPage;