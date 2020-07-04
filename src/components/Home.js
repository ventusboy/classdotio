import React, { Fragment } from "react";
 //import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
    //const { isAuthenticated } = useAuth0();
    console.log("Home");
    return (
        <Fragment>
            <div className="row mainbody col-12 justify-content-center">
                <h1 className="col-6">
                    Welcome To Class.io
                </h1>
            </div>
        </Fragment>

    )
}

export default Home;