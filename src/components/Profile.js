
import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

const Profile = () => {
  const { loading, user, logout, isAuthenticated } = useAuth0();
  const [classCount, setClassCount] = useState(0)
  
  useEffect(() => {
    async function getClasses () {
      try {
        let { data } = await axios.post('/getUserInfo')
        setClassCount(data.length)
      } catch (error) {
        console.log("error retrieving user data.")
        setClassCount(null)
      }
    }
    getClasses()
  },[])

  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <div> Not a user, please login. </div>
  }
  axios.defaults.headers.common['sub'] = user.sub;

  return (
    <Stack gap={2} className="mt-4">
      {user.picture && <img src={user.picture} alt="Profile" className="align-self-center" style={{ height: "100px", width: "100px"}} referrerPolicy="no-referrer" />}
      <h2 class="text-center">User: {user.name}</h2>
      <h4 class="text-center">Email: {user.email}</h4>
      <h4 class="text-center">Classes Added: {classCount}</h4>
      {/*<code>{JSON.stringify(user, null, 2)}</code>*/}
      <div class="text-center">
        {isAuthenticated && <Button variant="outline-primary" size="sm" onClick={() => logout({ returnTo: window.location.origin })}>Log out</Button>}
      </div>
    </Stack>
  );
};

export default Profile;