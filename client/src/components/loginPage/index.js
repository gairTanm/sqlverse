import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import LoginForm from "./loginForm";

const Brand = () => {
	const { push } = useHistory();
	const handleHome = () => {
		push("/home");
	};
	return (
		<Box position="absolute" h="12vh" w="12vw" left="5vw" top="2vh">
			<img
				onClick={handleHome}
				src={logo}
				alt="sqlverse"
				height="100vh"
				width="100vw"
			/>
		</Box>
	);
};

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
