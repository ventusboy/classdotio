// src/components/NavBar.js

import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { useEffect } from 'react';

const NavBar = () => {
    const location = useLocation();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
    },[location])

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>

            <div className='container-fluid' id="navbarNavAltMarkup">

                <div className="navbar-brand"><NavLink className={"nav-link"} to="/">Classdotio</NavLink> </div>
                {isAuthenticated && (
                    <button 
                        id="navbar-toggler"
                        className="navbar-toggler"
                        type="button" data-bs-toggle="collapse"
                        data-bs-target="#togglerTarget"
                        aria-controls="togglerTarget"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                )}
                <Collapse in={open}>
                    <div className="navbar-collapse justify-content-end" id="togglerTarget">
                        <ul className="navbar-nav">
                            {isAuthenticated && (
                                <Fragment>
                                    <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/" onSelect={() => setOpen(false)}>Home</NavLink></li>
                                    <li className="nav-item ms-auto me-auto"><NavLink className={"nav-link"} to="/profile" onSelect={() => setOpen(false)}>Profile</NavLink></li>
                                </Fragment>
                            )}

                        </ul>
                    </div>
                </Collapse>
                {!isAuthenticated && (
                    <div className="nav-item justify-self-end"><button className='btn btn-primary' onClick={() => loginWithRedirect({})}>Log in</button></div>
                )}
            </div>
        </nav>


    );
};

export default NavBar;