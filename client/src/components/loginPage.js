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
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const handleLogin = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 3000);
		// setTimeout(() => push("/home"), 4000);
	};
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { push } = useHistory();
	const handleSignUp = () => {
		push("/signup");
	};
	return (
		<Box h="100vh" w="100vw" bg="beige">
			<Center h="100vh">
				<Box h="70vh" w={[300, 400, 560]} p="5px" bg="beige">
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
										type={show ? "text" : "password"}
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
									whileHover={{ scale: 1.2 }}
									colorScheme="cyan"
									variant="ghost"
									isLoading={loading}
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
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									variant="ghost"
									onClick={handleSignUp}
								>
									Sign Up
								</MotionButton>
							</Stack>
						</Stack>
					</Center>
				</Box>
			</Center>
		</Box>
	);
};

export default LoginPage;
