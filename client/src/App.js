import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import SignUpPage from "./components/signUpPage";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/home">
						<HomePage />
					</Route>
					<Route exact path="/signup">
						<SignUpPage />
					</Route>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/">
						<HomePage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
