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
import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	username: Yup.string()
		.required("Username is required")
		.min(5, "A username is at least 5 characters in length"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "A password is at least 6 characters in length"),
	confirm: Yup.string()
		.required("Confirm the password entered above")
		.min(6)
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

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
		validationSchema,
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
							touched={formik.touched.name}
							onChange={formik.handleChange("name")}
							placeholder="Enter your name..."
							error={formik.errors.name}
						/>
						<FormItem
							label="Username"
							value={formik.values.username}
							touched={formik.touched.username}
							onChange={formik.handleChange("username")}
							placeholder="Enter your username..."
							error={formik.errors.username}
						/>
						<SecureFormItem
							placeholder="Enter your password..."
							label="Password"
							value={formik.values.password}
							touched={formik.touched.password}
							onChange={formik.handleChange("password")}
							show={showPass}
							toggle={handlePassClick}
							error={formik.errors.password}
						/>
						<SecureFormItem
							placeholder="Confirm your password..."
							label="Confirm Password"
							value={formik.values.confirm}
							onChange={formik.handleChange("confirm")}
							show={showConfirm}
							touched={formik.touched.confirm}
							toggle={handleConfirmClick}
							error={formik.errors.confirm}
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
