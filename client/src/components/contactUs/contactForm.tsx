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
import { MailFormItemProps } from "../../types";

const { REACT_APP_TEMPLATE_ID, REACT_APP_SERVICE_ID } = process.env;

const MotionButton = motion(Button);

const MailFormItem = ({
	isRequired = true,
	type = "text",
	value,
	onChange,
	label,
	placeholder
}: MailFormItemProps) => {
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

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		let templateParams = form;
		setLoading(true);

		if (REACT_APP_SERVICE_ID != null && REACT_APP_TEMPLATE_ID != null) {
			emailjs
				.send(
					REACT_APP_SERVICE_ID,
					REACT_APP_TEMPLATE_ID,
					templateParams
				)
				.then(
					function (response) {
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
						toast({
							title: "Unfortunately, the mail could not be sent, try again?",
							isClosable: true,
							variant: "left-accent",
							status: "error"
						});
						setLoading(false);
					}
				);
		}
	};
	const toast = useToast();

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, name: e.target.value });
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, email: e.target.value });
	};
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
					<MailFormItem
						type="text"
						value={form.name}
						onChange={handleNameChange}
						label="Name"
						placeholder="Enter your name..."
					/>
					<MailFormItem
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
