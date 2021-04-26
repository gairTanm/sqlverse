import {
	Box,
	HStack,
	Container,
	Center,
	Text,
	VStack,
	Spacer,
	UnorderedList,
	ListItem,
	ListIcon,
} from "@chakra-ui/layout";
import React from "react";
import tanmay from "../assets/tanmay.png";
import amogh from "../assets/amogh.png";
import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import { Flex } from "@chakra-ui/layout";

const Amogh = () => {
	return (
		<HStack>
			<Container>Amogh</Container>
			<Spacer />
			<img height="300px" width="300px" src={amogh} alt="amogh" />
		</HStack>
	);
};

const Tanmay = () => {
	return (
		<Flex
			alignItems="center"
			alignContent="space-around"
			justifyContent="space-evenly"
			w="100vw"
			direction="row"
		>
			<img
				style={{ borderRadius: "20px" }}
				src={tanmay}
				alt="tanmay"
				height="300px"
				width="300px"
			/>
			<Container>
				<UnorderedList>
					<ListItem>About me?</ListItem>
					<ListItem>
						<a
							href="https://gairTanm.github.io"
							target="_blank"
							rel="noreferrer"
						>
							Website
						</a>
					</ListItem>
					<ListItem>
						<a
							href="https://www.github.com/gairTanm"
							target="_blank"
							rel="noreferrer"
						>
							Github
						</a>
					</ListItem>
					<ListItem>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://randomtanmay.vercel.app"
						>
							Blog
						</a>
					</ListItem>
				</UnorderedList>
			</Container>
		</Flex>
	);
};

const Team = () => {
	const { push } = useHistory();
	return (
		<Box h="100vh" bg="white" w="100vw">
			<Box position="absolute" top="2vh" left="2vw">
				<IconButton
					variant="ghost"
					colorScheme="gray"
					h="5vh"
					w="5vw"
					_hover={{ color: "white", background: "black" }}
					icon={<ArrowBackIcon h="30px" w="30px" />}
					onClick={() => push("/home")}
				/>
			</Box>
			<Center>
				<VStack>
					<Text fontSize="7vw" fontFamily="Indie Flower">
						The Team
					</Text>
					<Tanmay />
					<br />
					<Amogh />
				</VStack>
			</Center>
		</Box>
	);
};

export default Team;
