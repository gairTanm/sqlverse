import { IconButton } from "@chakra-ui/button";
import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { Slide } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import React, { useState } from "react";

const queryLiterals = [
	"SELECT",
	"*",
	"FROM",
	"TABLE",
	"PICK",
	"ON",
	"JOIN",
	"AS",
];

const MotionBox = motion(Box);

const Draggable = ({ children }) => {
	return (
		<MotionBox
			fontFamily="monospace"
			fontSize="1vw"
			fontWeight="bold"
			bg="teal.200"
			p="10px"
			key={children}
			borderRadius="10px"
			dragConstraints={{ left: -300, right: 300, bottom: 20, top: -500 }}
			m="1vh"
			drag
			layout
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			{children}
		</MotionBox>
	);
};

const Bag = () => {
	const [bag, setBag] = useState(false);

	const toggleBag = () => {
		setBag(!bag);
	};

	return (
		<>
			<IconButton icon={<ArrowUpIcon />} onClick={toggleBag} />
			<Slide direction="bottom" in={bag} style={{ zIndex: 10 }}>
				<Box pos="absolute" top="2vh" right="2vw">
					<IconButton
						icon={<CloseIcon />}
						variant="unstyled"
						onClick={toggleBag}
					/>
				</Box>
				<Flex
					direction="row"
					p="40px"
					justify="center"
					color="white"
					mt="4"
					bg="teal.300"
					rounded="md"
					shadow="md"
				>
					{queryLiterals.map((ql) => {
						return <Draggable key={ql}>{ql}</Draggable>;
					})}
				</Flex>
			</Slide>
		</>
	);
};

export default Bag;
