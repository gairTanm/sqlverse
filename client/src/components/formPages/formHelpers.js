import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Divider, Stack, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import { useHistory } from "react-router";
import logo from "../../assets/logo.png";

const ButtonWMotion = motion(Button);

export const Brand = () => {
	const { push } = useHistory();
	const handleHome = () => {
		push("/home");
	};
	return (
		<Box position="absolute" h="4vh" w="4vw" left="5vw" top="2vh">
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

export const MotionButton = ({
	type,
	label,
	loading,
	colorScheme,
	variant = "ghost",
	onClick,
	isDisabled = false,
}) => {
	return (
		<ButtonWMotion
			whileHover={{ scale: 1.1 }}
			colorScheme={colorScheme}
			variant={variant}
			isDisabled={isDisabled}
			isLoading={loading}
			fontFamily="Hachi Maru Pop"
			whileTap={{ scale: 0.9 }}
			type={type}
			onClick={onClick}
		>
			{label}
		</ButtonWMotion>
	);
};

export const FormItem = ({
	isRequired = true,
	label,
	placeholder,
	value,
	onChange,
	variant = "filled",
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				<Input
					onChange={onChange}
					value={value}
					placeholder={placeholder}
					focusBorderColor="cyan.300"
					_active={{ background: "#B7E3CC" }}
					variant={variant}
				/>
			</InputGroup>
		</FormControl>
	);
};

export const SecureFormItem = ({
	isRequired = true,
	label,
	toggle,
	show,
	value,
	onChange,
	placeholder,
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				<Input
					onChange={onChange}
					value={value}
					variant="filled"
					_active={{ background: "#B7E3CC" }}
					type={show ? "text" : "password"}
					focusBorderColor="cyan.300"
					placeholder={placeholder}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={toggle}>
						{show ? "Hide" : "Show"}
					</Button>
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
};

export const OrDivider = () => {
	return (
		<Stack direction="row">
			<Divider height="12px" />
			<Text>
				<b>or</b>
			</Text>
			<Divider height="12px" />
		</Stack>
	);
};

export const FormHeading = ({ heading }) => {
	return (
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
				{heading}
			</Text>
		</Center>
	);
};
