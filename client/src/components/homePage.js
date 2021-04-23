import { Center, Box, Text } from "@chakra-ui/layout";
import React from "react";
import Copyright from "./copyright";
import Navbar from "./navbar";

const Footer = () => {
	return (
		<Box
			h="100px"
			bg="white"
			w="100vw"
			position="absolute"
			bottom={0}
			overflow="hidden"
		>
			<Center h="100px">
				<Copyright />
			</Center>
		</Box>
	);
};

const Title = () => {
	return (
		<Box>
			<Center>
				<Text fontSize="7xl" fontFamily="Comfortaa">
					SQLVERSE
				</Text>
			</Center>
		</Box>
	);
};

const HomePage = () => {
	return (
		<Box overflowX="hidden" h="140vh" w="100vw" bg="beige">
			<Navbar />
			<img src="" alt="home-pic" />
			<Title />
			<Footer />
		</Box>
	);
};

export default HomePage;
