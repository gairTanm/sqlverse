import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React from "react";
import AwShucks from "../awShucks";
//import Bag from "./bag";
import UserTable from "./reactable";
import Settings from "./settings";

const Playground = () => {
	if (!localStorage.getItem("login-token")) {
		return <AwShucks />;
	}
	return (
		<Flex h="100vh" w="100vw" justify="center">
			<Box pos="absolute" bottom="2vh">
				<UserTable />
			</Box>
			<Box pos="absolute" right="2vw" top="2vh">
				<Settings />
			</Box>
		</Flex>
	);
};

export default Playground;
