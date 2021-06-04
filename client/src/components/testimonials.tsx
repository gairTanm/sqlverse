import { Box, Center, Container, Flex, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { HomeButton } from "./team";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import { Footer } from "./homePage";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	img: {
		filter: "grayscale(100%)",
		transition: "all .3s",
		"&:hover": {
			filter: "none"
		}
	}
});

interface TestimonialTemplateProps {
	image: string;
	text: string;
	left: boolean;
	name: string;
	alt: string;
	title: string;
}

const TestimonialTemplate = ({
	image,
	text,
	left,
	name,
	alt,
	title
}: TestimonialTemplateProps) => {
	const classes = useStyles();
	return (
		<Flex direction="row" w="100vw" justifyContent="space-between">
			<Spacer />
			{left ? (
				<img
					className={classes.img}
					src={image}
					height="300px"
					width="300px"
					alt={alt}
				/>
			) : null}
			<Spacer />
			<Center>
				<Container>
					<Flex
						alignItems="center"
						fontFamily="Comfortaa"
						direction="column"
					>
						<Text fontSize="4xl">{name}</Text>
						<Text fontSize="2xl">{title}</Text>
						<Text>{text}</Text>
					</Flex>
				</Container>
			</Center>
			<Spacer />
			{left ? null : (
				<img
					className={classes.img}
					height="300px"
					width="300px"
					src={image}
					alt={alt}
				/>
			)}
			<Spacer />
		</Flex>
	);
};

const Testimonials = () => {
	return (
		<Box w="100%" h="200vh">
			<HomeButton />
			<Center>
				<Flex w="100vw" direction="column">
					<Center>
						<Text fontSize="7vw" fontFamily="Indie Flower">
							Testimonials
						</Text>
					</Center>
					<Center>
						<Text
							w="70vw"
							fontFamily="Comfortaa"
							fontSize="xl"
							textAlign="center"
						>
							Over time, a lot people have tried <i>sqlverse</i>,
							with each one having a unique experience and
							cherished memories. <i>sqlverse</i> gave them all
							the right foundation required for managing
							databases, and for that matter, SQL databases. Below
							are some of the people that went through it all and
							came out with a skill learnt !
						</Text>
					</Center>
					<Spacer />
					<Flex justifyContent="space-evenly" direction="column">
						<TestimonialTemplate
							image={one}
							alt="hewwo"
							title="Student"
							text="Lorem ipsum dolor"
							name="Tanmay"
							left={true}
						/>
						<TestimonialTemplate
							image={two}
							left={false}
							alt="gg"
							title="Student"
							text="Lorem ipsum dolor sit"
							name="Amogh"
						/>
						<TestimonialTemplate
							image={three}
							left={true}
							alt="exo"
							title="SWE"
							text="Lorem ipsum dolor sit"
							name="Jane"
						/>
						<TestimonialTemplate
							image={four}
							left={false}
							alt="ji"
							title="SDE"
							text="Lorem ipsum dolor sit"
							name="Doe"
						/>
					</Flex>
				</Flex>
				<Footer />
			</Center>
		</Box>
	);
};

export default Testimonials;
