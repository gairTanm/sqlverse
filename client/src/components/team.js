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
import tanmay from "../assets/tanmay.jpeg";

const Amogh = () => {
	return (
		<HStack>
			<Container>Amogh</Container>
			<Spacer />
			<img src="" alt="amogh" />
		</HStack>
	);
};

const Tanmay = () => {
	return (
		<HStack>
			<img
				style={{ borderRadius: "20px" }}
				src={tanmay}
				alt="tanmay"
				height="400px"
				width="400px"
			/>
			<Spacer />
			<Container>
				<UnorderedList>
					<ListItem>About me?</ListItem>
					<ListItem>
						<a href="https://gairTanm.github.io" target="_blank">
							Website
						</a>
					</ListItem>
					<ListItem>
						<a
							href="https://www.github.com/gairTanm"
							target="_blank"
						>
							Github
						</a>
					</ListItem>
					<ListItem>
						<a
							target="_blank"
							href="https://randomtanmay.vercel.app"
						>
							Blog
						</a>
					</ListItem>
				</UnorderedList>
			</Container>
		</HStack>
	);
};

const Team = () => {
	return (
		<Box h="100vh" bg="beige" w="100vw">
			<Center>
				<VStack>
					<Text>Team</Text>
					<Tanmay />
					<Amogh />
				</VStack>
			</Center>
		</Box>
	);
};

export default Team;
