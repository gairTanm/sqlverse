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

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "http://localhost:8080/graphql",
	}),
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
