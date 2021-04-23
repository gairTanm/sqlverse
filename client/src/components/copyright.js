import React from "react";
import { Center, Text } from "@chakra-ui/react";

const Copyright = () => {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<Center>
			<Text>Copyright © sqlverse {year}</Text>
		</Center>
	);
};

export default Copyright;
