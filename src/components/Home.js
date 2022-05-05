import React, { Fragment } from "react";
//import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
    //const { isAuthenticated } = useAuth0();
    return (
        <Fragment>
            <div className="mainbody container-fluid">


                <div className="row d-flex justify-content-center">
                    <h1 className="col-6 text-center">
                        Welcome To Class.io
                    </h1>
                </div>
                <div className="row d-flex  justify-content-center">
                    <h4 className="col-12 col-md-10 text-center">
                        <span>    </span>Classdotio is an interactive Web Application using React, Node.js, Auth0, and Firebase Firestore to
                    visually tell users
                    which classes they have taken, which classes they are eligible to take, and which classes
                    they are
                    unable to take. It uses the Auth0 SDK to enable user profile Authentication.
                    </h4>
                </div>
            </div>
        </Fragment>

    )
}

export default Home;