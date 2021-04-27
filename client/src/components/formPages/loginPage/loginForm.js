import React, { useState } from "react";
import { Box, Center, Stack, useToast } from "@chakra-ui/react";
import Copyright from "../../copyright";
import { useHistory } from "react-router-dom";
import {
	FormHeading,
	FormItem,
	MotionButton,
	OrDivider,
	SecureFormItem,
} from "../formHelpers";

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const handleLogin = (e) => {
		e.preventDefault();
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
	const handleClick = (e) => {
		e.preventDefault();
		setShow(!show);
	};
	const { push } = useHistory();
	const handleSignUp = (e) => {
		e.preventDefault();
		push("/signup");
	};
	const toast = useToast();
	return (
		<Box h="70vh" w={[300, 400, 560]} p="5px" bg="white">
			<Center>
				<form onSubmit={handleLogin}>
					<Stack spacing={[5, 10, 25]} w={[300, 350, 350]}>
						<FormHeading heading="Log In" />
						<FormItem
							label="Username"
							placeholder="Enter your username"
						/>
						<SecureFormItem
							label="Password"
							placeholder="Enter your password"
							toggle={handleClick}
							show={show}
						/>
						<Stack spacing="15px">
							<MotionButton
								label="Log In"
								colorScheme="cyan"
								type="submit"
								loading={loading}
							/>
							<OrDivider />
							<MotionButton
								label="Sign Up"
								onClick={handleSignUp}
								colorScheme="orange"
							/>
							<Copyright />
						</Stack>
					</Stack>
				</form>
			</Center>
		</Box>
	);
};

export default LoginForm;
