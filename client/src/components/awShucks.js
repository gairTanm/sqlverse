import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

const AwShucks = () => {
	return (
		<Flex
			align="center"
			justify="center"
			direction="column"
			w="100vw"
			h="100vh"
		>
			<Heading>You seem to be logged out :(</Heading>
			<img alt="awshucks" src={null} width="50vw" height="50vh" />
			<Text>
				Try{" "}
				<Link to="/login" style={{}}>
					logging in
				</Link>{" "}
				again
			</Text>
		</Flex>
	);
};

export default AwShucks;
