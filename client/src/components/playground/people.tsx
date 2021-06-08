import React, { useEffect, useRef, useState } from "react";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../mutations";
import { ALL_USERS, ME } from "../../queries";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import { User, UserData } from "../../types";
import AwShucks from "../awShucks";
import { BackButton } from "../team";

const TableHeaders: string[] = ["S. No.", "Name", "Username", "Add Friend"];

//TODO: Add a popover confirmation to mutate list
const ConfirmFriendMutation = (isFriend: boolean) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	return <></>;
};

const People = () => {
	const allUsers = useQuery<UserData>(ALL_USERS);
	const me = useQuery(ME);
	const [friends, setFriends] = useState(["no friend"]);
	const [addFriend] = useMutation(ADD_FRIEND);
	const [removeFriend] = useMutation(REMOVE_FRIEND);

	/*if (loading) {
		return <div>Loading...</div>;
	}*/
	if (me.error?.name == "" || allUsers.error?.name == "") {
		return <AwShucks />;
	}

	useEffect(() => {
		if (me.loading) return;
		setFriends(
			me.data.me.friends.map((f: User) => {
				return f.username;
			})
		);
	}, [me]);

	//TODO: !checked=>removeFriendMutation checked=>addFriendMutation
	const handleFriendClick = async (
		e: React.ChangeEvent<HTMLInputElement>,
		username: string,
		isChecked: boolean
	) => {
		console.log(username, isChecked);
		if (isChecked) {
			try {
				let result = await removeFriend({
					variables: {
						friendname: username
					}
				});
				console.log(result);
				await me.refetch();
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				let result = await addFriend({
					variables: {
						username
					}
				});
				console.log(result);
				await me.refetch();
			} catch (e) {
				console.log(e);
			}
		}
	};

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
				<Button onClick={() => allUsers.refetch()}>Update List</Button>
			</Box>
			<Skeleton isLoaded={!allUsers.loading && !me.loading}>
				<Box w="70vw">
					<Table variant="simple">
						<Thead>
							<Tr>
								{TableHeaders.map((h) => (
									<Th key={h}>{h}</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{friends &&
								allUsers.data &&
								allUsers.data.getUsers.map((user: User) => {
									i += 1;
									let checked = friends.includes(
										user.username
									);
									return (
										<Tr key={i}>
											<Td>{i}.</Td>
											<Td>{user.name}</Td>
											<Td>{user.username}</Td>
											<Td>
												<Checkbox
													colorScheme="cyan"
													isChecked={checked}
													onChange={(e) =>
														handleFriendClick(
															e,
															user.username,
															checked
														)
													}
												/>
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
