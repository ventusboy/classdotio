import React from 'react';
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './style.scss';
//import $ from 'jquery';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import history from "./utils/history";
import ClassCard from "./components/ClassCard.js";
import Home from "./components/Home.js"
import DashBoard from './pages/DashBoard';
//import classes from '*.module.css';




function App() {
	const { loading, isAuthenticated, user } = useAuth0();



	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="App d-flex flex-grow-1 flex-column justify-content-between">
			<div className="d-flex flex-grow-1 flex-column">
				{/* Don't forget to include the history module */}
				<Router history={history}>
					<header className='sticky-top'>
						<NavBar />
					</header>
					<Switch>

						{/*<PrivateRoute path="/" component={ClassCard} />*/}

						<Route exact path="/">
							{isAuthenticated ? <DashBoard user={user} /> : <Home />}

						</Route>

						<PrivateRoute exact path="/dashboard" >
							<DashBoard user={user} />
						</PrivateRoute>
						<Route path="/profile" >
							<Profile />
						</Route>

					</Switch>
				</Router>
			</div>
			<footer>
				<h4 className='bottom-brand'>Made by <a href="https://www.mikalyoung.com/" target="_blank" rel="noopener noreferrer">Mikal Young</a></h4>
			</footer>
		</div >
	);
}




//import trashIcon from './assets/delete.svg';



export default App;
