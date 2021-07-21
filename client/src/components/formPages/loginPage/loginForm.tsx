import React, { useState } from "react";
import { Box, Center, Stack, useToast } from "@chakra-ui/react";
import Copyright from "../../copyright";
import { useHistory } from "react-router-dom";
import {
	FormHeading,
	FormItem,
	MotionButton,
	OrDivider,
	SecureFormItem
} from "../formHelpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LOGIN } from "../../../mutations";
import { useMutation } from "@apollo/client";

const validationSchema = Yup.object({
	username: Yup.string()
		.required("Username is required")
		.min(5, "A username is at least 5 characters in length"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "A password is at least 6 characters in length")
});

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [login] = useMutation(LOGIN);
	const { push } = useHistory();
	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			localStorage.removeItem("login-token");
			try {
				const { data } = await login({
					variables: {
						username: values.username,
						password: values.password
					}
				});
				localStorage.setItem("login-token", data.login.value);
				setTimeout(() => {
					setLoading(false);
					toast({
						title: `Welcome back, ${values.username}!`,
						isClosable: true,
						variant: "left-accent",
						status: "success"
					});
					formik.resetForm();
					push("/playground");
				}, 1500);
			} catch (e) {
				setTimeout(() => {
					setLoading(false);
					toast({
						title: `Wrong Username or Password`,
						isClosable: true,
						variant: "left-accent",
						status: "error"
					});
				}, 1500);
			}
		}
	});

	const [show, setShow] = useState(false);
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setShow(!show);
	};
	const handleSignUp = (e: React.MouseEvent) => {
		e.preventDefault();
		push("/signup");
	};

	return (
		<Box h="70vh" w={[300, 400, 560]} p="5px" bg="white">
			<Center>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={[5, 10, 25]} w={[300, 350, 350]}>
						<FormHeading heading="Log In" />
						<FormItem
							onChange={formik.handleChange("username")}
							value={formik.values.username}
							label="Username"
							error={formik.errors.username}
							touched={formik.touched.username}
							placeholder="Enter your username"
						/>
						<SecureFormItem
							label="Password"
							onChange={formik.handleChange("password")}
							value={formik.values.password}
							placeholder="Enter your password"
							toggle={handleClick}
							error={formik.errors.password}
							touched={formik.touched.password}
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
