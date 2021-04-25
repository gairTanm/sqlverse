import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/loading";

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<Loading />}>
			<Router>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</Router>
		</Suspense>
	</React.StrictMode>,
	document.getElementById("root")
);
