import { Box, Center, Container, Flex, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { TestimonialTemplateProps } from "../types";
import { BackButton } from "./team";
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

const TestimonialValues: TestimonialTemplateProps[] = [
	{
		image: one,
		alt: "hewwo",
		title: "Student",
		text: "Lorem ipsum dolor sit",
		name: "Tanmay",
		left: true
	},
	{
		image: two,
		alt: "gg",
		title: "Student",
		text: "Lorem ipsum dolor sit",
		name: "Amogh",
		left: false
	},
	{
		image: three,
		alt: "exo",
		title: "SWE",
		text: "Lorem ipsum dolor sit",
		name: "Jane",
		left: true
	},
	{
		image: four,
		alt: "ji",
		title: "SDE",
		text: "Lorem ipsum dolor sit",
		name: "Doe",
		left: false
	}
];

const Testimonials = () => {
	return (
		<Box w="100%" h="200vh">
			<BackButton />
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
						{TestimonialValues.map(
							(tv: TestimonialTemplateProps) => (
								<TestimonialTemplate
									image={tv.image}
									alt={tv.alt}
									title={tv.title}
									text={tv.text}
									name={tv.name}
									left={tv.left}
								/>
							)
						)}
					</Flex>
				</Flex>
				<Footer />
			</Center>
		</Box>
	);
};

export default Testimonials;
