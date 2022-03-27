import React from "react";

import NavBar from "./NavBar";

const HomePage = (props) => {

    const blockchain = props.blockchain;
    const tst= ["1","2","3"];
    return (
        <>
            <NavBar/>
            <main>
                <ul>
                    {console.log(blockchain)}
                    {tst.map((element,index) => (
                        <React.Fragment key={index}>
                            <li>{element}</li>
                            {/* <li>{element.hash}</li> */}
                        </React.Fragment>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default HomePage;