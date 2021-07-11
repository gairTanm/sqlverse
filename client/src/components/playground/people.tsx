import { useMutation, useQuery } from "@apollo/client";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	RepeatIcon
} from "@chakra-ui/icons";
import {
	Box,
	Checkbox,
	Flex,
	Heading,
	IconButton,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Skeleton,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useMemo, useState } from "react";
import { Column, HeaderGroup, usePagination, useTable } from "react-table";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../mutations";
import { ALL_USERS, ME } from "../../queries";
import { User } from "../../types";
import AwShucks from "../awShucks";
import { BackButton } from "../team";

interface TableData {
	idx: number;
	username: string;
	name: string;
	isChecked: boolean;
}

interface HandleFriendClickArgs {
	username: string;
	isChecked: boolean;
	e: React.ChangeEvent<HTMLInputElement>;
}

interface HandleFriendClick {
	(args: HandleFriendClickArgs): Promise<void>;
}

interface Refetch {
	(): Promise<void>;
}

interface CustomTableProps {
	data: TableData[];
	columns: Column<TableData>[];
	handleFriendClick: HandleFriendClick;
	refetch: Refetch;
}

const CustomTable = ({
	data,
	columns,
	handleFriendClick,
	refetch
}: CustomTableProps) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		state: { pageIndex }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: false,
			initialState: { pageSize: 6 }
		},
		usePagination
	);
	return (
		<>
			<Table variant="striped" colorScheme="cyan" {...getTableProps}>
				<Thead>
					{headerGroups.map((headerGroup: HeaderGroup<TableData>) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th {...column.getHeaderProps()}>
									{column.render("Header")}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<Tr alignContent="center" {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<>
											<Td {...cell.getCellProps()}>
												{cell.render("Cell")}
												{cell.column.Header ==
												"Add as Friend" ? (
													<Checkbox
														isChecked={cell.value}
														onChange={(e) =>
															handleFriendClick({
																e,
																username:
																	// @ts-ignore
																	cell.row
																		.original // @ts-ignore
																		.username,
																isChecked:
																	cell.value
															})
														}
													/>
												) : null}
											</Td>
										</>
									);
								})}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
			<Flex justifyContent="space-between" m={4} alignItems="center">
				<Flex>
					<Tooltip label="First Page">
						<IconButton
							aria-label="a"
							onClick={() => gotoPage(0)}
							isDisabled={!canPreviousPage}
							icon={<ArrowLeftIcon h={3} w={3} />}
							mr={4}
						/>
					</Tooltip>
					<Tooltip label="Previous Page">
						<IconButton
							aria-label="b"
							onClick={previousPage}
							isDisabled={!canPreviousPage}
							mr={4}
							icon={<ChevronLeftIcon h={6} w={6} />}
						/>
					</Tooltip>
					<Tooltip label="Refresh">
						<IconButton
							aria-label="k"
							mr={4}
							onClick={refetch}
							icon={<RepeatIcon h={6} w={6} />}
						/>
					</Tooltip>
				</Flex>

				<Flex alignItems="center">
					<Text flexShrink={0} mr={8}>
						Page{" "}
						<Text fontWeight="bold" as="span">
							{pageIndex + 1}
						</Text>{" "}
						of{" "}
						<Text fontWeight="bold" as="span">
							{pageOptions.length}
						</Text>
					</Text>
					<Text flexShrink={0}>Go to page:</Text>{" "}
					<NumberInput
						ml={2}
						mr={8}
						w={28}
						min={1}
						max={pageOptions.length}
						onChange={(
							valueAsString: string,
							valueAsNumber: number
						) => {
							const page = valueAsNumber ? valueAsNumber - 1 : 0;
							gotoPage(page);
						}}
						defaultValue={pageIndex + 1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				<Flex>
					<Tooltip label="Next Page">
						<IconButton
							aria-label="c"
							onClick={nextPage}
							isDisabled={!canNextPage}
							icon={<ChevronRightIcon h={6} w={6} />}
						/>
					</Tooltip>
					<Tooltip label="Last Page">
						<IconButton
							onClick={() => gotoPage(pageCount - 1)}
							aria-label="d"
							isDisabled={!canNextPage}
							icon={<ArrowRightIcon h={3} w={3} />}
							ml={4}
						/>
					</Tooltip>
				</Flex>
			</Flex>
		</>
	);
};

const UserTable = () => {
	const allUsers = useQuery(ALL_USERS, { partialRefetch: true });
	const me = useQuery(ME);
	const [addFriend] = useMutation(ADD_FRIEND);
	const [removeFriend] = useMutation(REMOVE_FRIEND);
	const [friends, setFriends] = useState<string[]>(["no-friends"]);
	const toast = useToast();

	const handleFriendClick = async ({
		e,
		isChecked,
		username
	}: HandleFriendClickArgs) => {
		e.preventDefault();
		if (isChecked) {
			try {
				await removeFriend({
					variables: {
						friendname: username
					}
				});
				await me.refetch();
				toast({
					title: `Removed ${username} as a friend`,
					variant: "left-accent",
					status: "warning",
					isClosable: true
				});
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				await addFriend({
					variables: {
						username
					}
				});
				await me.refetch();
				toast({
					title: `Added ${username} as a friend`,
					variant: "left-accent",
					status: "warning",
					isClosable: true
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	const columns: Column<TableData>[] = useMemo(
		() => [
			{
				Header: "S. No.",
				accessor: "idx"
			},
			{
				Header: "Username",
				accessor: "username"
			},
			{
				Header: "Name",
				accessor: "name"
			},
			{
				Header: "Add as Friend",
				accessor: "isChecked"
			}
		],
		[]
	);

	const isEmpty = useMemo(
		() => me.loading || allUsers.loading,
		[me, allUsers]
	);

	let i = 1;

	const users: TableData[] = useMemo(() => {
		if (allUsers.loading) return null;
		return allUsers.data.getUsers.map((user: User) => {
			return {
				idx: i++,
				username: user.username,
				name: user.name,
				isChecked: friends.includes(user.username)
			};
		});
	}, [allUsers, isEmpty, friends]);

	useEffect(() => {
		if (me.loading) return;
		setFriends(
			me.data.me.friends.map((f: User) => {
				return f.username;
			})
		);
	}, [me]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
	}, []);

	if (allUsers.error || me.error) {
		return <AwShucks />;
	}

	const refetch = async () => {
		await allUsers.refetch();
		await me.refetch();
	};

	return (
		<>
			<Skeleton isLoaded={!loading}>
				{users && (
					<CustomTable
						handleFriendClick={handleFriendClick}
						data={users}
						refetch={refetch}
						columns={columns}
					/>
				)}
			</Skeleton>
		</>
	);
};

const UserPage = () => {
	return (
		<Box w="100vw" h="100vh">
			<Flex
				h="100vh"
				w="100vw"
				justify="space-around"
				direction="column"
				align="center"
			>
				<BackButton to="/playground" />
				<Box align="center">
					<Heading as="h1" size="4xl" fontFamily="Comfortaa">
						Users
					</Heading>
					<br />
					<Heading as="h2" size="xl" fontFamily="Comfortaa">
						Add a friend, maybe?
					</Heading>
					<br />
				</Box>
				<Box w="80vw">
					<UserTable />
				</Box>
			</Flex>
		</Box>
	);
};

export default UserPage;
