import React from "react";
import { Link } from "react-router-dom";


const ChatHeader = (props) =>{

    const {address} = props;

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top border-2 border-top border-warning shadow-lg">
                <div className="container-fluid">
                    <Link to="/transaction" className="navbar-brand border-2 border-bottom border-warning logo">
                        &ensp;<i className="bi bi-caret-left-fill"></i>&ensp;
                    </Link>
                    <div className="chat-address text-truncate">{address}</div>
                </div>
            </nav>
        </header>
    )
}

export default ChatHeader;