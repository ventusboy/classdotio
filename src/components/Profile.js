// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user, logout, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <div> not the user </div>
  }

  return (
    <div className="d-flex flex-column align-content-center">
      <img src={user.picture} alt="Profile" style={{ height: "100px", width: "100px"}} referrerPolicy="no-referrer" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      {isAuthenticated && <button className='btn btn-outline-primary justify-self-end' onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>}
    </div>
  );
};

export default Profile;