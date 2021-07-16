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
import React, { useEffect } from "react";
import { ME } from "../../queries";
import { BackButton } from "../team";

const sqlDecoration = () => {
	return (
		<Box>
			<Text>select * from profile;</Text>
		</Box>
	);
};

const Profile = () => {
	const { loading, data, refetch } = useQuery(ME);

	useEffect(() => {
		console.log(data);
	}, [loading]);

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
						<Flex
							align="center"
							alignContent="center"
							justifyContent="space-around"
							minH="sm"
							minW="sm"
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
										console.log(f);
										return <Flex>{f.username}</Flex>;
									})}
							</Wrap>
						</Flex>
					</Skeleton>
				</Flex>
			</Flex>
		</>
	);
};

export default Profile;
