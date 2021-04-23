import { AnimatePresence } from "framer-motion";
import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import Playground from "./components/playground";
import SignUpPage from "./components/signUpPage";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import Team from "./components/team";
import RoutingAnimation from "./components/routingAnimation";
import Testimonials from "./components/testimonials";

function App() {
	const location = useLocation();

	return (
		<Box overflowX="hidden" overflowY="hidden">
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route exact path="/home">
						<RoutingAnimation>
							<HomePage />
						</RoutingAnimation>
					</Route>
					<Route exact path="/signup">
						<RoutingAnimation>
							<SignUpPage />
						</RoutingAnimation>
					</Route>
					<Route exact path="/login">
						<RoutingAnimation>
							<LoginPage />
						</RoutingAnimation>
					</Route>
					<Route exact path="/playground">
						<RoutingAnimation>
							<Playground />
						</RoutingAnimation>
					</Route>
					<Route exact path="/team">
						<RoutingAnimation>
							<Team />
						</RoutingAnimation>
					</Route>
					<Route exact path="/testimonials">
						<RoutingAnimation>
							<Testimonials />
						</RoutingAnimation>
					</Route>
					<Route exact path="/">
						<RoutingAnimation>
							<HomePage />
						</RoutingAnimation>
					</Route>
				</Switch>
			</AnimatePresence>
		</Box>
	);
}

export default App;
