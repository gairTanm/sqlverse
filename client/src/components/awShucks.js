import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import awshucks from "../assets/awshucks.svg";

const useStyles = createUseStyles({
	link: {
		boxShadow: "inset 0 -5px 0 -1px lightcyan",
		transition: "box-shadow .2s ease-in-out",
		color: "black",
		lineHeight: "40px",
		"&:hover": {
			boxShadow: "inset 0 -40px 0 -1px lightcyan",
		},
	},
});

const AwShucks = () => {
	const classes = useStyles();

	return (
		<Flex
			align="center"
			justify="center"
			direction="column"
			w="100vw"
			h="100vh"
			justifyContent="space-evenly"
		>
			<Heading as="h1" size="4xl">
				Shoot!
			</Heading>
			<Heading as="h2" size="xl">
				You seem to be logged out :(
			</Heading>
			<img alt="awshucks" src={awshucks} width="300px" height="300px" />
			<Text textAlign="center" fontSize="2xl">
				Try{" "}
				<Link to="/login" className={classes.link}>
					logging in
				</Link>{" "}
				again?
				<br />
				Or maybe try writing{" "}
				<Link to="/contact" className={classes.link}>
					a mail
				</Link>{" "}
				to us? Or just{" "}
				<Link to="/home" className={classes.link}>
					go back
				</Link>{" "}
				?
			</Text>
		</Flex>
	);
};

export default AwShucks;
