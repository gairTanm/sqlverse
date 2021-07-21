import { useQuery } from "@apollo/client";
import {
	Box,
	Center,
	Flex,
	Image,
	Skeleton,
	Text,
	Wrap
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { ME } from "../../queries";
import { BackButton } from "../team";

const MotionFlex = motion(Flex);

const Profile = () => {
	const { loading, data, refetch } = useQuery(ME);

	return (
		<>
			<BackButton to="/playground" />
			<Box position="absolute" top="2vh" left="45vw">
				<Center>
					<Text fontSize="4vw" fontFamily="Indie Flower">
						Profile
					</Text>
				</Center>
			</Box>
			<Flex w="100vw" h="100vh" alignContent="center" justify="center">
				<Flex
					w="80vw"
					justifyContent="space-around"
					flexDirection="row"
					align="center"
					justify="center"
				>
					<Box maxH="sm" maxW="sm">
						<Image
							borderRadius="100%"
							src="https://source.unsplash.com/random/600x600"
						/>
					</Box>
					<Skeleton isLoaded={!loading}>
						<MotionFlex
							align="center"
							alignContent="center"
							justifyContent="space-around"
							minH="sm"
							minW="sm"
							style={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1 }}
							whileHover={{ scale: 1.04 }}
							borderRadius="lg"
							borderWidth="1px"
							fontFamily="Comfortaa"
							flexDirection="column"
						>
							<Box>
								<b>Name:</b> {data && data.me.username}
							</Box>
							<Box>
								<b>Username:</b> {data && data.me.name}
							</Box>
							<Box>
								<b>Friends:</b> {data && data.me.friends.length}
							</Box>
							<Wrap>
								{data &&
									data.me.friends.map((f) => {
										return (
											<Flex key={f.username}>
												{f.username}
											</Flex>
										);
									})}
							</Wrap>
						</MotionFlex>
					</Skeleton>
				</Flex>
			</Flex>
		</>
	);
};

export default Profile;
