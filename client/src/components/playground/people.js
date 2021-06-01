import React from "react";
import { ALL_USERS } from "../../queries";
import { useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Checkbox } from "@chakra-ui/checkbox";

const People = () => {
	const result = useQuery(ALL_USERS);
	if (result.loading) {
		return <div>Loading...</div>;
	}
	console.log(result);
	var i = 0;
	return (
		<Flex justify="center">
			<Box w="70vw">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>S. No.</Th>
							<Th>Name</Th>
							<Th>Username</Th>
							<Th>Send Request</Th>
						</Tr>
					</Thead>
					<Tbody>
						{result.data.getUsers.map((user) => {
							i += 1;
							return (
								<Tr key={user.username}>
									<Td>{i}</Td>
									<Td>{user.name}</Td>
									<Td>{user.username}</Td>
									<Td>
										<Checkbox />
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Flex>
	);
};

export default People;
