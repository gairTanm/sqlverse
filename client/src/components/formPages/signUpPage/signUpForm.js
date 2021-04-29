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
import { useFormik } from "formik";

const SignUpForm = () => {
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			password: "",
			confirm: "",
		},
		onSubmit: (values) => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				toast({
					title: `Signed up successfully, ${values.name}`,
					isClosable: true,
					variant: "left-accent",
					status: "success",
				});
				formik.setValues({
					name: "",
					username: "",
					password: "",
					confirm: "",
				});
				setAgree(false);
			}, 3000);
		},
	});

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

	return (
		<Box h="90vh" w={[300, 400, 560]} p="1px" bg="white">
			<Center>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={[5, 10, 30]} w={[300, 350, 350]}>
						<FormHeading heading="Sign Up" />
						<FormItem
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange("name")}
							placeholder="Enter your name..."
						/>
						<FormItem
							label="Username"
							value={formik.values.username}
							onChange={formik.handleChange("username")}
							placeholder="Enter your username..."
						/>
						<SecureFormItem
							placeholder="Enter your password..."
							label="Password"
							value={formik.values.password}
							onChange={formik.handleChange("password")}
							show={showPass}
							toggle={handlePassClick}
						/>
						<SecureFormItem
							placeholder="Confirm your password..."
							label="Confirm Password"
							value={formik.values.confirm}
							onChange={formik.handleChange("confirm")}
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
