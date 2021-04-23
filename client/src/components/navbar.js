import { Button } from "@chakra-ui/button";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import icon from "../assets/icon.png";

const MotionButton = motion(Button);

const BarButton = ({ text, clickHandler }) => {
	return (
		<MotionButton
			style={{ marginLeft: "2px", marginRight: "2px" }}
			onClick={clickHandler}
			variant="ghost"
			_hover={{ background: "#EDEDED" }}
			colorScheme="white"
			borderRadius={5}
		>
			{text}
		</MotionButton>
	);
};

const Navbar = () => {
	const { push } = useHistory();
	const handleLogin = () => push("/login");
	const handleSignUp = () => push("/signup");
	const handleTeam = () => push("/team");
	const handleTestimonials = () => push("/testimonials");

	const destinations = [
		{ text: "Log In", clickHandler: handleLogin },
		{ text: "Sign Up", clickHandler: handleSignUp },
		{
			text: "Testimonials",
			clickHandler: handleTestimonials,
		},
		{ text: "Team", clickHandler: handleTeam },
	];
	return (
		<Box borderRadius="lg" overflow="hidden" w="100vw" bg="white">
			<Flex alignSelf="flex-end" p={2}>
				<Center>
					<HStack paddingLeft="3vw">
						<img src={icon} height="35px" width="35px" />
						<Text fontFamily="Comfortaa">sqlverse</Text>
					</HStack>
				</Center>
				<Spacer />
				<Flex>
					{destinations.map(({ text, clickHandler }) => {
						return (
							<BarButton
								text={text}
								key={text}
								clickHandler={clickHandler}
							/>
						);
					})}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
