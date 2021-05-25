import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/loading";
import { ChakraProvider } from "@chakra-ui/react";

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
