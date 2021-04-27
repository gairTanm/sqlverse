import React from "react";
import { Box, Center } from "@chakra-ui/react";
import LoginForm from "./loginForm";
import { Brand } from "../formHelpers";

const LoginPage = () => {
	return (
		<Box h="100vh" w="100vw" bg="white">
			<Brand />
			<Center h="100vh">
				<LoginForm />
			</Center>
		</Box>
	);
};

export default LoginPage;
