import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/loading";
import { ChakraProvider } from "@chakra-ui/react";
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("login-token");
	console.log(token === false);
	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : "",
		},
	};
});

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Suspense fallback={<Loading />}>
				<Router>
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</Router>
			</Suspense>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
