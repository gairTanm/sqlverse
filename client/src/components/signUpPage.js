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

const SignUpPage = () => {
	const [loading, setLoading] = useState(false);
	const handleSignUp = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 3000);
	};
	const [showPass, setShowPass] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const handlePassClick = () => setShowPass(!showPass);
	const handleConfirmClick = () => setShowConfirm(!showConfirm);
	const { push } = useHistory();
	const handleLogin = () => {
		push("/login");
	};
	return (
		<Box h="100vh" w="100vw" bg="beige">
			<Center h="100%">
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
									Sign Up
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
										type={showPass ? "text" : "password"}
										placeholder="Enter your password..."
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
								<Button
									colorScheme="cyan"
									variant="ghost"
									isLoading={loading}
									onClick={handleSignUp}
								>
									Sign Up
								</Button>
								<Stack direction="row">
									<Divider height="12px" />
									<Text>
										<b>or</b>
									</Text>
									<Divider height="12px" />
								</Stack>
								<Button
									colorScheme="orange"
									variant="ghost"
									onClick={handleLogin}
								>
									Log In
								</Button>
							</Stack>
						</Stack>
					</Center>
				</Box>
			</Center>
		</Box>
	);
};

export default SignUpPage;
