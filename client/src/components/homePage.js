import { Center, Box, Text, Flex } from "@chakra-ui/layout";
import React from "react";
import Copyright from "./copyright";
import Navbar from "./navbar";
import home from "../assets/home-image.svg";

const Footer = () => {
	return (
		<Box
			h="100px"
			bg="black"
			color="white"
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
				<Text fontSize="7vw" fontFamily="Indie Flower">
					SQLVERSE
				</Text>
			</Center>
		</Box>
	);
};

const HomePage = () => {
	return (
		<Box h="200vh" w="100vw" bg="white">
			<Navbar />
			<Flex alignContent="center" direction="column">
				<Center>
					<img src={home} alt="home-pic" />
				</Center>
				<Title />
			</Flex>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
};

export default HomePage;
