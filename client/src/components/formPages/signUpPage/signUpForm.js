import React, { useState } from "react";
import {
	Box,
	Center,
	Checkbox,
	Link,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Copyright from "../../copyright";
import {
	FormHeading,
	FormItem,
	OrDivider,
	SecureFormItem,
	MotionButton,
} from "../formHelpers";

const SignUpForm = () => {
	const [loading, setLoading] = useState(false);

	const handleSignUp = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			toast({
				title: "Signed up successfully",
				isClosable: true,
				variant: "left-accent",
				status: "success",
			});
		}, 3000);
	};

	const [showPass, setShowPass] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [agree, setAgree] = useState(false);
	const handleAgreeClick = () => setAgree(!agree);
	const handlePassClick = (e) => {
		e.preventDefault();
		setShowPass(!showPass);
	};
	const handleConfirmClick = (e) => {
		e.preventDefault();
		setShowConfirm(!showConfirm);
	};
	const { push } = useHistory();
	const handleLogin = (e) => {
		e.preventDefault();
		push("/login");
	};
	const toast = useToast();

	return (
		<Box h="90vh" w={[300, 400, 560]} p="1px" bg="white">
			<Center>
				<form onSubmit={handleSignUp}>
					<Stack spacing={[5, 10, 30]} w={[300, 350, 350]}>
						<FormHeading heading="Sign Up" />
						<FormItem
							label="Name"
							placeholder="Enter your name..."
						/>
						<FormItem
							label="Username"
							placeholder="Enter your username..."
						/>
						<SecureFormItem
							placeholder="Enter your password..."
							label="Password"
							show={showPass}
							toggle={handlePassClick}
						/>
						<SecureFormItem
							placeholder="Confirm your password..."
							label="Confirm Password"
							show={showConfirm}
							toggle={handleConfirmClick}
						/>
						<Stack spacing="1vh">
							<Center>
								<Stack direction="row">
									<Checkbox onChange={handleAgreeClick} />
									<Text>
										I agree to the{" "}
										<Link isExternal color="teal" href="#">
											<u>terms and conditions</u>
										</Link>
									</Text>
								</Stack>
							</Center>
							<MotionButton
								isDisabled={!agree}
								colorScheme="cyan"
								loading={loading}
								type="submit"
								label="Sign Up"
							/>
							<OrDivider />
							<MotionButton
								label="Log In"
								colorScheme="orange"
								onClick={handleLogin}
							/>
							<Copyright />
						</Stack>
					</Stack>
				</form>
			</Center>
		</Box>
	);
};

export default SignUpForm;
