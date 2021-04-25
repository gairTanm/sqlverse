import React from "react";
import { Box, Center } from "@chakra-ui/react";
import SignUpForm from "./signUpForm";
import { Brand } from "../loginPage/index";

const SignUpPage = () => {
	return (
		<Box h="100vh" w="100vw" bg="white">
			<Brand />
			<Center h="100%">
				<SignUpForm />
			</Center>
		</Box>
	);
};

export default SignUpPage;
