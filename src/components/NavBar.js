// src/components/NavBar.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>

            <div className='container-fluid row d-flex justify-content-end' id="navbarNavAltMarkup">

                <h1 className="navbar-brand"><Link to="/">Classdotio</Link> by <a href="https://www.mikalyoung.com/" target="_blank"> Mikal Young</a></h1>


                <ul className="nav navbar-nav d-flex align-items-center flex-row-reverse col-3 ml-auto justify-content-start ">





                    {!isAuthenticated && (
                        <li className="nav-item"><button className='btn btn-primary' onClick={() => loginWithRedirect({})}>Log in</button></li>
                    )}

                    {isAuthenticated && <li className="nav-item ml-auto"><button className='btn btn-outline-primary justify-self-end' onClick={() => logout({ returnTo: window.location.origin })}>Log out</button></li>}

                    {isAuthenticated && (
                        <Fragment>
                            <li className="nav-item p-2"><Link to="/profile" >Profile</Link></li>
                            <li className="nav-item p-2"><Link to="/dashboard" >Home</Link></li>
                        </Fragment>
                    )}

                </ul>

            </div>
        </nav>


    );
};

export default NavBar;