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
} from "@chakra-ui/layout";
import React from "react";
import tanmay from "../assets/tanmay.png";
import amogh from "../assets/amogh.png";
import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import { Flex } from "@chakra-ui/layout";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	img: (props) => ({
		borderRadius: "20px",
		filter: "grayscale(100%)",
		transition: "all .2s",
		transform: `rotate(${props.rot}deg)`,
		"&:hover": {
			filter: "grayscale(0%)",
			transform: `rotate(0deg)`,
		},
	}),
});

const Amogh = () => {
	const classes = useStyles({ rot: -15 });
	return (
		<HStack>
			<Container fontFamily="Comfortaa">
				<Text
					fontFamily="Hachi Maru Pop"
					fontSize={30}
					fontWeight="bold"
					paddingBottom={5}
					paddingLeft={10}
				>
					Amogh Sachdeva
				</Text>
				<UnorderedList spacing={3}>
					<ListItem>LinkedIn</ListItem>
					<ListItem>
						<a
							href="https://github.com/amogh24"
							target="_blank"
							rel="noreferrer"
						>
							Github
						</a>
					</ListItem>
				</UnorderedList>
			</Container>
			<img
				className={classes.img}
				height="300px"
				width="300px"
				src={amogh}
				alt="amogh"
			/>
		</HStack>
	);
};

const Tanmay = () => {
	const classes = useStyles({ rot: 15 });
	return (
		<Flex
			w="100%"
			h="100%"
			alignItems="center"
			justifyContent="space-evenly"
			direction="row"
		>
			<img
				className={classes.img}
				src={tanmay}
				alt="tanmay"
				height="300px"
				width="300px"
			/>
			<Spacer />
			<Container fontFamily="Comfortaa">
				<Text
					fontFamily="Hachi Maru Pop"
					fontSize={30}
					fontWeight="bold"
					paddingBottom={5}
					paddingLeft={10}
				>
					Tanmay Gairola
				</Text>
				<UnorderedList spacing={3}>
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

export const HomeButton = () => {
	const { push } = useHistory();
	return (
		<Box position="absolute" top="2vh" left="2vw">
			<IconButton
				variant="ghost"
				colorScheme="gray"
				h="5vh"
				w="5vw"
				_hover={{
					transform: "scale(0.8)",
					color: "white",
					background: "black",
				}}
				icon={<ArrowBackIcon h="30px" w="30px" />}
				onClick={() => push("/home")}
			/>
		</Box>
	);
};

const Team = () => {
	return (
		<Box h="100vh" bg="white" w="100vw">
			<HomeButton />
			<Center>
				<VStack alignItems="center">
					<Text fontSize="7vw" fontFamily="Indie Flower">
						The Team
					</Text>
					<Center>
						<Tanmay />
					</Center>
					<br />
					<Amogh />
				</VStack>
			</Center>
		</Box>
	);
};

export default Team;
