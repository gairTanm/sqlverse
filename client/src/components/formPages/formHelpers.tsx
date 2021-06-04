import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Divider, Stack, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const ButtonWMotion = motion(Button);

export const Brand = () => {
	return (
		<Link to="/home">
			<Box position="absolute" h="4vh" w="4vw" left="5vw" top="2vh">
				<img src={logo} alt="sqlverse" height="100vh" width="100vw" />
			</Box>
		</Link>
	);
};

interface MotionButtonProps {
	type?: "submit";
	variant?: "solid" | "ghost" | "outline" | "link";
	label: string;
	loading?: boolean;
	colorScheme: string;
	isDisabled?: boolean;
	onClick?: React.MouseEventHandler;
}

export const MotionButton = ({
	type,
	label,
	loading,
	colorScheme,
	variant = "ghost",
	onClick,
	isDisabled = false
}: MotionButtonProps) => {
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

interface FormItemBase {
	isRequired?: boolean;
	label: string;
	placeholder: string;
	value: string;
	onChange: React.ChangeEventHandler;
	error: string;
	touched: boolean;
	variant?: "filled" | "ghost" | "outline" | "solid";
}

export const FormItem = ({
	isRequired = true,
	label,
	placeholder,
	value,
	onChange,
	error,
	touched,
	variant = "filled"
}: FormItemBase) => {
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
			<Box h="1vh" textColor="palevioletred">
				{error && touched ? error : null}
			</Box>
		</FormControl>
	);
};

interface SecureFormItemProps extends FormItemBase {
	show: boolean;
	toggle: React.MouseEventHandler;
}

export const SecureFormItem = ({
	isRequired = true,
	label,
	toggle,
	show,
	value,
	onChange,
	error,
	touched,
	placeholder
}: SecureFormItemProps) => {
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
			<Box h="1vh" textColor="palevioletred">
				{error && touched ? error : null}
			</Box>
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

export const FormHeading = ({ heading }: { heading: string }) => {
	return (
		<Center>
			<Text
				fontSize={{
					base: "24px",
					md: "40px",
					lg: "50px"
				}}
				fontWeight="bold"
				fontFamily="Comfortaa"
			>
				{heading}
			</Text>
		</Center>
	);
};
