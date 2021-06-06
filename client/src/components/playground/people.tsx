import React from "react";
import { ALL_USERS } from "../../queries";
import { useQuery } from "@apollo/client";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button, Skeleton } from "@chakra-ui/react";
import { User, UserData } from "../../types";
import AwShucks from "../awShucks";
import { BackButton } from "../team";

const People = () => {
	const { loading, error, data, refetch } = useQuery<UserData>(ALL_USERS);

	/*if (loading) {
		return <div>Loading...</div>;
	}*/
	if (error?.name == "") {
		return <AwShucks />;
	}

	let i = 0;
	return (
		<Flex
			h="100vh"
			justify="space-evenly"
			direction="column"
			align="center"
		>
			<BackButton to="/playground" />
			<Box align="center" pos="absolute" top="2vh">
				<Heading as="h1" size="4xl">
					Users
				</Heading>
				<br />
				<Heading as="h2" size="xl">
					Add a friend, maybe?
				</Heading>
				<br />
				<Button onClick={() => refetch()}>Update List</Button>
			</Box>
			<Skeleton isLoaded={!loading}>
				<Box w="70vw">
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>S. No.</Th>
								<Th>Name</Th>
								<Th>Username</Th>
								<Th>Add Friend</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data &&
								data.getUsers.map((user: User) => {
									i += 1;
									return (
										<Tr key={user.username}>
											<Td>{i}.</Td>
											<Td>{user.name}</Td>
											<Td>{user.username}</Td>
											<Td>
												<Checkbox colorScheme="cyan" />
											</Td>
										</Tr>
									);
								})}
						</Tbody>
					</Table>
				</Box>
			</Skeleton>
		</Flex>
	);
};

export default People;
