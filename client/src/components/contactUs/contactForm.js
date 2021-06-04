import React, { useState } from "react";
import { Input } from "@chakra-ui/input";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import emailjs from "emailjs-com";
import { Center, Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import "dotenv";

const { REACT_APP_TEMPLATE_ID, REACT_APP_SERVICE_ID } = process.env;

const MotionButton = motion(Button);

const FormItem = ({
	isRequired = true,
	type = "text",
	value,
	onChange,
	label,
	placeholder
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			<Input
				variant="filled"
				onChange={onChange}
				value={value}
				_active={{ background: "#B7E3CC" }}
				focusBorderColor="cyan.300"
				placeholder={placeholder}
				type={type}
			/>
		</FormControl>
	);
};

const MailForm = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		var templateParams = form;
		setLoading(true);

		emailjs
			.send(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, templateParams)
			.then(
				function (response) {
					console.log("SUCCESS!", response.status, response.text);
					toast({
						title: "We'll get back to you shortly!",
						isClosable: true,
						variant: "left-accent",
						status: "info"
					});
					setLoading(false);
					setForm({ name: "", email: "", message: "" });
				},
				function (error) {
					console.log("FAILED...", error);
					toast({
						title: "Unfortunately, the mail could not be sent, try again?",
						isClosable: true,
						variant: "left-accent",
						status: "error"
					});
					setLoading(false);
				}
			);
	};
	const toast = useToast();

	const handleNameChange = (e) => {
		setForm({ ...form, name: e.target.value });
	};
	const handleEmailChange = (e) => {
		setForm({ ...form, email: e.target.value });
	};
	const handleMessageChange = (e) => {
		setForm({ ...form, message: e.target.value });
	};

	return (
		<Center>
			<form onSubmit={handleSubmit}>
				<Flex
					direction="column"
					justifyContent="space-around"
					h="80vh"
					w="60vw"
				>
					<Center>
						<Text fontSize="35px" fontFamily="Comfortaa">
							We would love to hear from you!
						</Text>
					</Center>
					<FormItem
						value={form.name}
						onChange={handleNameChange}
						label="Name"
						placeholder="Enter your name..."
					/>
					<FormItem
						label="Mail"
						value={form.email}
						onChange={handleEmailChange}
						type="email"
						placeholder="Enter your email address..."
					/>
					<FormControl isRequired>
						<FormLabel>Message</FormLabel>
						<Textarea
							h="30vh"
							value={form.message}
							onChange={handleMessageChange}
							variant="filled"
							focusBorderColor="cyan.300"
							_active={{ background: "#B7E3CC" }}
							placeholder="Enter your message..."
						/>
					</FormControl>
					<Center>
						<MotionButton
							colorScheme="cyan"
							variant="ghost"
							w="20vw"
							type="submit"
							isLoading={loading}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							Send
						</MotionButton>
					</Center>
				</Flex>
			</form>
		</Center>
	);
};

export default MailForm;
