import React, {useState, useEffect} from "react";
import NavBar from "../parts/NavBar";


const SignupPage = () => {
    const [address, setMessage] = useState("");
    // useEffect(()=>{
        
    // },[]);

    const generateAddress = () =>{
        fetch("/generate-address")
        .then((res)=>res.json())
        .then((data)=>setMessage(data.public)); 
        console.log(address);
    };

    return(
        <>
            <NavBar/>
            <main className="form-signin text-center">
                <img className="mb-4" src="https://pbs.twimg.com/profile_images/1366595750/3_400x400.jpg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                {address ? <>{address}</>:<button onClick={generateAddress} className="mt-5 w-100 btn btn-lg btn-primary" type="button">Sign up</button>}

                <p className="mt-5 mb-3">Already have address? Please <a href="/signin">sign in</a>.</p>
                <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
            </main>
        </>
    )
}

export default SignupPage;