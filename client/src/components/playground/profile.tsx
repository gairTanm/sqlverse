import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const sqlDecoration = () => {
	return (
		<Box>
			<Text>select * from profile;</Text>
		</Box>
	);
};

const Profile = () => {
	return (
		<Flex flexDirection="row">
			<Box></Box>
			<Box></Box>
		</Flex>
	);
};

export default Profile;
