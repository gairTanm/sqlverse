import { Center, Box } from "@chakra-ui/layout";
import React from "react";
import Navbar from "./navbar";

const HomePage = () => {
	return (
		<Box h="100vh" w="100vw" bg="beige">
			<Navbar />
			<Center>Home Page</Center>
		</Box>
	);
};

export default HomePage;
