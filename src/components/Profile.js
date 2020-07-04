// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();
  console.log('yikes');

  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <div> not the user </div>
  }

  return (

    <Fragment>
      {console.log(user)}
      <img src={user.picture} alt="Profile" style={{ height: "100px" }} />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;