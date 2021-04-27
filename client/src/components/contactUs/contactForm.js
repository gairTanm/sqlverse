import React from "react";
import { Input } from "@chakra-ui/input";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import emailjs from "emailjs-com";
import { Center, Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

const FormItem = ({ isRequired = true, label, placeholder }) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			<Input
				variant="filled"
				_active={{ background: "#B7E3CC" }}
				_focus={{ background: "white" }}
				placeholder={placeholder}
			/>
		</FormControl>
	);
};

const MotionButton = motion(Button);

const MailForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		toast({
			title: "We'll get back to you shortly!",
			isClosable: true,
			variant: "left-accent",
			status: "info",
		});
	};
	const toast = useToast();

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
					<FormItem label="Name" placeholder="Enter your name..." />
					<FormItem
						label="Mail"
						placeholder="Enter your email address..."
					/>
					<FormControl isRequired>
						<FormLabel>Message</FormLabel>
						<Textarea
							h="30vh"
							variant="filled"
							_active={{ background: "#B7E3CC" }}
							_focus={{ background: "white" }}
							placeholder="Enter your message..."
						/>
					</FormControl>
					<Center>
						<MotionButton
							colorScheme="cyan"
							variant="ghost"
							w="20vw"
							type="submit"
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
