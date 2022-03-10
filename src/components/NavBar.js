// src/components/NavBar.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>

            <div className='container-fluid' id="navbarNavAltMarkup">

                <a className="navbar-brand"><NavLink className={"nav-link"} to="/">Classdotio</NavLink> </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#togglerTarget" aria-controls="togglerTarget" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end"  id="togglerTarget">
                    <ul className="navbar-nav">
                        {!isAuthenticated && (
                            <li className="nav-item justify-content-end"><button className='btn btn-primary' onClick={() => loginWithRedirect({})}>Log in</button></li>
                        )}

                        {isAuthenticated && (
                            <Fragment>
                                <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/" >Home</NavLink></li>                                
                                <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/profile" >Profile</NavLink></li>
                            </Fragment>
                        )}

                    </ul>
                </div>

            </div>
        </nav>


    );
};

export default NavBar;