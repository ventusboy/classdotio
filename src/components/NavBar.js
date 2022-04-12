// src/components/NavBar.js

import React, { Fragment, useRef } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    let togglerRef = useRef(null)
    let collapseRef = useRef(null)
    function collapseNav () {
        let nav = document.getElementById("togglerTarget");
        let btn = document.getElementById("navbar-toggler");
        nav.classList.remove("show");
        btn.classList.add("collapsed");
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>

            <div className='container-fluid' id="navbarNavAltMarkup">

                <div className="navbar-brand"><NavLink className={"nav-link"} to="/">Classdotio</NavLink> </div>
                {isAuthenticated && (
                    <button id="navbar-toggler" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#togglerTarget" aria-controls="togglerTarget" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                )}
                <div className="collapse navbar-collapse justify-content-end" id="togglerTarget">
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                            <Fragment>
                                <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/" onSelect={() => null}>Home</NavLink></li>                                
                                <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/profile" onSelect={() => null}>Profile</NavLink></li>
                            </Fragment>
                        )}

                    </ul>
                </div>
                {!isAuthenticated && (
                    <div className="nav-item justify-self-end"><button className='btn btn-primary' onClick={() => loginWithRedirect({})}>Log in</button></div>
                )}
            </div>
        </nav>


    );
};

export default NavBar;