import React, { useState } from "react";
import {
	Box,
	Button,
	Center,
	Checkbox,
	Divider,
	FormControl,
	FormLabel,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Copyright from "./copyright";

const MotionButton = motion(Button);

const SignUpPage = () => {
	const [loading, setLoading] = useState(false);
	const handleSignUp = () => {
		setLoading(true);
		toast({
			title: "Signed up successfully",
			isClosable: true,
			variant: "left-accent",
			status: "success",
		});
		setTimeout(() => setLoading(false), 3000);
	};
	const [showPass, setShowPass] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [agree, setAgree] = useState(false);
	const handleAgreeClick = () => setAgree(!agree);
	const handlePassClick = () => setShowPass(!showPass);
	const handleConfirmClick = () => setShowConfirm(!showConfirm);
	const { push } = useHistory();
	const handleLogin = () => {
		push("/login");
	};
	const handleHome = () => {
		push("/home");
	};
	const toast = useToast();

	return (
		<Box h="100vh" w="100vw" bg="beige">
			<Box position="absolute" h="12vh" w="12vw" left="5vw" top="2vh">
				<img
					onClick={handleHome}
					src={logo}
					height="100vh"
					width="100vw"
				/>
			</Box>
			<Center h="100%">
				<Box h="80vh" w={[300, 400, 560]} p="1px" bg="beige">
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
									Sign Up
								</Text>
							</Center>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<InputGroup>
									<Input
										placeholder="Enter your name..."
										_active={{ background: "#B7E3CC" }}
										_focus={{ background: "white" }}
										variant="filled"
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<InputGroup>
									<Input
										placeholder="Enter your username..."
										_active={{ background: "#B7E3CC" }}
										_focus={{ background: "white" }}
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
										type={showPass ? "text" : "password"}
										placeholder="Enter your password..."
										_focus={{ background: "white" }}
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handlePassClick}
										>
											{showPass ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Confirm Password</FormLabel>
								<InputGroup>
									<Input
										variant="filled"
										type={showConfirm ? "text" : "password"}
										placeholder="Confirm your password..."
										_active={{ background: "#B7E3CC" }}
										_focus={{ background: "white" }}
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleConfirmClick}
										>
											{showConfirm ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing="15px">
								<Center>
									<Stack direction="row">
										<Checkbox onChange={handleAgreeClick} />
										<Text>
											I agree to the{" "}
											<Link
												isExternal
												color="teal"
												href="#"
											>
												<u>terms and conditions</u>
											</Link>
										</Text>
									</Stack>
								</Center>
								<MotionButton
									colorScheme="cyan"
									variant="ghost"
									isLoading={loading}
									onClick={handleSignUp}
									isDisabled={!agree}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									Sign Up
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
									variant="ghost"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={handleLogin}
								>
									Log In
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

export default SignUpPage;
