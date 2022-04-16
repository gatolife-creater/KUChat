import React, {useState, useEffect} from "react";


const SignupPage = () => {
    const [address, setMessage] = useState("");
    useEffect(()=>{
        fetch("/generate-address")
        .then((res)=>res.json())
        .then((data)=>setMessage(data.public));
    },[])
    return(
        <>
            <main className="form-signin text-center">
                <form action="/generate-address">
                    <img className="mb-4" src="https://pbs.twimg.com/profile_images/1366595750/3_400x400.jpg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                
                    {/* <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" style={{borderTopRightRadius: "0.25rem", borderTopLeftRadius: "0.25rem"}}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div> */}
                
                    <button className="mt-5 w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                    <p className="mt-5 mb-3">Already have address? Please <a href="/signin">sign in</a>.</p>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </>
    )
}

export default SignupPage;