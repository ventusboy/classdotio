import React from 'react';
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './style.css';
//import $ from 'jquery';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import history from "./utils/history";
import ClassCard from "./components/ClassCard.js";
import Home from "./components/Home.js"
//import classes from '*.module.css';




function App() {
	const { loading, isAuthenticated, user } = useAuth0();



	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="App container-fluid">
			{/* Don't forget to include the history module */}
			<Router history={history}>
				<header>
					<NavBar />
				</header>
				<Switch>

					{/*<PrivateRoute path="/" component={ClassCard} />*/}

					<Route exact path="/">
						{isAuthenticated ? <ClassCard user={user} /> : <Home />}

					</Route>

					<PrivateRoute exact path="/dashboard" >
						<ClassCard user={user} />
					</PrivateRoute>
					<Route path="/profile" >
						<Profile />
					</Route>

				</Switch>
			</Router>
		</div >
	);
}




//import trashIcon from './assets/delete.svg';



export default App;
