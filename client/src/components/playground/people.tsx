import { useMutation, useQuery } from "@apollo/client";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon
} from "@chakra-ui/icons";
import {
	Checkbox,
	Flex,
	IconButton,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
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

interface TableData {
	idx: number;
	username: string;
	name: string;
	isChecked: boolean;
}

interface HandleFriendClickArgs {
	e: React.ChangeEvent<HTMLInputElement>;
	username: string;
	isChecked: boolean;
}

interface HandleFriendClick {
	(args: HandleFriendClickArgs): Promise<void>;
}

interface CustomTableProps {
	data: TableData[];
	columns: Column<TableData>[];
	handleFriendClick: HandleFriendClick;
}

const CustomTable = ({
	data,
	columns,
	handleFriendClick
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
			data
		},
		usePagination
	);
	return (
		<>
			<Table {...getTableProps}>
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
							<Tr {...row.getRowProps()}>
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
																	cell.row
																		.original
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
							icon={<ChevronLeftIcon h={6} w={6} />}
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
	const allUsers = useQuery(ALL_USERS);
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

	useEffect(() => console.log(friends), [friends]);
	useEffect(() => {
		if (me.loading) return;
		setFriends(
			me.data.me.friends.map((f: User) => {
				return f.username;
			})
		);
	}, [me]);

	return (
		<>
			{users && (
				<CustomTable
					handleFriendClick={handleFriendClick}
					data={users}
					columns={columns}
				/>
			)}
		</>
	);
};

export default UserTable;
