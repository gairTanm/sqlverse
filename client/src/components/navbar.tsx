import { Button } from "@chakra-ui/button";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import icon from "../assets/icon.png";
import { BarButtonProps } from "../types";

const MotionButton = motion(Button);

const BarButton = ({ text, clickHandler }: BarButtonProps) => {
	return (
		<MotionButton
			style={{ marginLeft: "2px", marginRight: "2px" }}
			onClick={clickHandler}
			variant="ghost"
			_hover={{
				transform: "scale(0.85)",
				background: "black",
				color: "white"
			}}
			colorScheme="white"
			borderRadius={5}
			fontFamily="Hachi Maru Pop"
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
	const handleContact = () => push("/contact");
	const destinations = [
		{ text: "Log In", clickHandler: handleLogin },
		{ text: "Sign Up", clickHandler: handleSignUp },
		{
			text: "Testimonials",
			clickHandler: handleTestimonials
		},
		{ text: "Team", clickHandler: handleTeam },
		{ text: "Contact Us", clickHandler: handleContact }
	];
	return (
		<Box
			borderRadius="lg"
			overflow="hidden"
			top="0px"
			position="fixed"
			style={{ backdropFilter: "blur(10px)" }}
			w="100vw"
			borderBottom="1px"
			borderBottomColor="lightgray"
			bg="transparent"
		>
			<Flex alignSelf="flex-end" p={2}>
				<Center>
					<HStack paddingLeft="3vw">
						<img
							alt="sqlverse"
							src={icon}
							height="35px"
							width="35px"
						/>
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
