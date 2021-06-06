import React from "react";
import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/layout";
import MailForm from "./contactForm";
import { BackButton } from "../team";

const ContactUs = () => {
	return (
		<Flex
			direction="column"
			justifyContent="space-between"
			h="100vh"
			w="100vw"
			alignItems="center"
		>
			<BackButton />
			<Center>
				<Box h="10vh">
					<Text fontSize="8vh" fontFamily="Indie Flower">
						Contact Us
					</Text>
				</Box>
			</Center>
			<MailForm />
			<Spacer />
		</Flex>
	);
};

export default ContactUs;
