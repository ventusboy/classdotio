import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import DashBoard from './pages/DashBoard';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';





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
				<h4 className='bottom-brand ps-2'>Made by <a href="https://www.mikalyoung.com/" target="_blank" rel="noopener noreferrer">Mikal Young</a></h4>
			</footer>
		</div >
	);
}




export default App;
