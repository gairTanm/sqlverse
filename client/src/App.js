import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homePage";
import LoginPage from "./components/formPages/loginPage/index";
import SignUpPage from "./components/formPages/signUpPage/index";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import Team from "./components/team";
import RoutingAnimation from "./components/routingAnimation";
import Testimonials from "./components/testimonials";
import ContactUs from "./components/contactUs/index.js";
import { init } from "emailjs-com";
import Loading from "./components/loading";
import Playground from "./components/playground/index.js";
import People from "./components/playground/people";

const { REACT_APP_EMAIL_USER_ID } = process.env;

const App = () => {
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		init(REACT_APP_EMAIL_USER_ID);
	}, []);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<>
			{loading ? (
				<Loading loading={loading} />
			) : (
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
							<Route exact path="/contact">
								<RoutingAnimation>
									<ContactUs />
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
							<Route exact path="/playground/friends">
								<RoutingAnimation>
									<People />
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
			)}
		</>
	);
};

export default App;
