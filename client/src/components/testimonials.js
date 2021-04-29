import { Box, Center, Container, Flex, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { HomeButton } from "./team";

const TestimonialTemplate = ({ image, text, left, name, alt }) => {
	return (
		<Flex direction="row" w="100vw" justifyContent="space-between">
			<Spacer />
			{left ? <img src={image} alt={alt} /> : null}
			<Spacer />
			<Container>
				<Flex fontFamily="Comfortaa" direction="column">
					<Text fontSize="4xl">{name}</Text>
					<Text>{text}</Text>
				</Flex>
			</Container>
			<Spacer />
			{left ? null : <img src={image} alt={alt} />}
			<Spacer />
		</Flex>
	);
};

const Testimonials = () => {
	return (
		<Box h="100vh" w="100vw">
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
							came out with a skill learnt!
						</Text>
					</Center>
					<Flex
						h="100vh"
						justifyContent="space-evenly"
						direction="column"
					>
						<TestimonialTemplate
							image={null}
							alt="hewwo"
							text="Lorem ipsum dolor"
							name="Tanmay"
							left={true}
						/>
						<TestimonialTemplate
							image={null}
							left={false}
							alt="gg"
							text="Lorem ipsum dolor sit"
							name="Amogh"
						/>
						<TestimonialTemplate
							image={null}
							left={true}
							alt="ex"
							text="Lorem ipsum dolor sit"
							name="John"
						/>
						<TestimonialTemplate
							image={null}
							left={false}
							alt="ji"
							text="Lorem ipsum dolor sit"
							name="Doe"
						/>
					</Flex>
				</Flex>
			</Center>
		</Box>
	);
};

export default Testimonials;
