import {
	Center,
	Box,
	Text,
	Flex,
	Container,
	HStack,
	Spacer,
} from "@chakra-ui/layout";
import React from "react";
import Copyright from "./copyright";
import Navbar from "./navbar";
import home from "../assets/home-image.svg";
import ex from "../assets/maybe (1).svg";
import z from "../assets/maybe2.svg";
import journey from "../assets/journey.svg";

const Footer = () => {
	return (
		<Box
			h="100px"
			bg="black"
			color="white"
			position="absolute"
			w="100%"
			bottom="0px"
			overflowX="hidden"
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
				<Text fontSize="8vw" fontFamily="Indie Flower">
					SQLVERSE
				</Text>
			</Center>
		</Box>
	);
};

const Why = () => {
	return (
		<Container bg="white" maxW="container.xl">
			<Text textAlign="center" fontFamily="Comfortaa" fontSize="20px">
				SQL, and managing databases in general, is a hard skill to
				master. Computer Science students spend four whole months trying
				to grasp just the basics. We want to take out the hard part of
				it. <i>sqlverse</i> not only makes it easy to get started with
				SQL, it does not leave you when the going gets tough and lorem
				ipsum
			</Text>
		</Container>
	);
};

const How = () => {
	return (
		<Center>
			<HStack>
				<Container
					maxW="container.md"
					bg="white"
					alignSelf="start"
					fontSize="20px"
					fontFamily="Comfortaa"
					textAlign="center"
				>
					Featuring an intuitive drag-and-drop UI, <i>sqlverse</i>{" "}
					makes tinkering with SQL as easy as playing with blocks, and
					learning it as easy as...ummm...let's be honest, learning
					and thinking in SQL is not easy, but <i>sqlverse</i> is as
					easy it gets
				</Container>
				<img height="500px" width="500px" src={ex} alt="ex" />
			</HStack>
		</Center>
	);
};

const Journey = () => {
	return (
		<Center>
			<HStack>
				<Container
					maxW="container.md"
					bg="white"
					alignSelf="start"
					fontSize="20px"
					fontFamily="Comfortaa"
					textAlign="center"
				>
					So, let's start going down that road, let's that journey to
					master <i>the art of the SQL</i> (totally original journey
					name), with us by your side, helping you learn the ropes of
					SQL for whatever reason that you might want to learn it!
				</Container>
				<img height="500px" width="500px" src={journey} alt="journey" />
			</HStack>
		</Center>
	);
};

const You = () => {
	return (
		<Center>
			<HStack>
				<img height="400px" width="400px" src={z} alt="z" />
				<Center h="400px">
					<Container
						textAlign="center"
						maxW="container.md"
						bg="white"
						alignSelf="start"
						fontSize="20px"
						fontFamily="Comfortaa"
					>
						<i>sqlverse</i> features everything, from the basic
						SELECT and WHERE queries, all the way upto SQL window
						functions and complex JOIN queries, and become the
						rockstar-astronaut-SQL-hero, or whatever that guy on the
						left is, you always wanted to be!
					</Container>
				</Center>
			</HStack>
		</Center>
	);
};

const HomePage = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "350vh",
				overflowX: "hidden",
			}}
		>
			<Flex h="100%" flexDirection="column">
				<Navbar />
				<Center>
					<img src={home} alt="home-pic" />
				</Center>
				<Title />
				<Spacer />
				<Why />
				<Spacer />
				<How />
				<Spacer />
				<You />
				<Spacer />
				<Journey />
				<Spacer />
				<Footer />
				<Spacer />
			</Flex>
		</div>
	);
};

export default HomePage;
