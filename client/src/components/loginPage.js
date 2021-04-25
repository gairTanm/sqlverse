import React, { useState } from "react";
import {
	Box,
	Button,
	Center,
	Divider,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Copyright from "./copyright";

const MotionButton = motion(Button);

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const handleLogin = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 3000);
		toast({
			title: "Welcome back",
			isClosable: true,
			variant: "left-accent",
			status: "success",
		});
		// setTimeout(() => push("/playground"), 4000);
	};
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { push } = useHistory();
	const handleSignUp = () => {
		push("/signup");
	};
	const handleHome = () => {
		push("/home");
	};
	const toast = useToast();
	return (
		<Box h="100vh" w="100vw" bg="white">
			<Box position="absolute" h="12vh" w="12vw" left="5vw" top="2vh">
				<img
					onClick={handleHome}
					src={logo}
					alt="sqlverse"
					height="100vh"
					width="100vw"
				/>
			</Box>
			{/* <Image boxSize="100px" src="../assets/logo.png" /> */}
			<Center h="100vh">
				<Box h="70vh" w={[300, 400, 560]} p="5px" bg="white">
					<Center>
						<Stack spacing={[5, 10, 25]} w={[300, 350, 350]}>
							<Center>
								<Text
									fontSize={{
										base: "24px",
										md: "40px",
										lg: "50px",
									}}
									fontWeight="bold"
									fontFamily="Comfortaa"
								>
									Log In
								</Text>
							</Center>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<InputGroup>
									<Input
										_active={{ background: "#B7E3CC" }}
										_focus={{ background: "white" }}
										placeholder="Enter your username..."
										variant="filled"
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										variant="filled"
										_active={{ background: "#B7E3CC" }}
										type={show ? "text" : "password"}
										_focus={{ background: "white" }}
										placeholder="Enter your password..."
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleClick}
										>
											{show ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing="15px">
								<MotionButton
									whileHover={{ scale: 1.1 }}
									colorScheme="cyan"
									variant="ghost"
									isLoading={loading}
									whileTap={{ scale: 0.9 }}
									onClick={handleLogin}
								>
									Log In
								</MotionButton>
								<Stack direction="row">
									<Divider height="12px" />
									<Text>
										<b>or</b>
									</Text>
									<Divider height="12px" />
								</Stack>
								<MotionButton
									colorScheme="orange"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									variant="ghost"
									onClick={handleSignUp}
								>
									Sign Up
								</MotionButton>
								<Copyright />
							</Stack>
						</Stack>
					</Center>
				</Box>
			</Center>
		</Box>
	);
};

export default LoginPage;
