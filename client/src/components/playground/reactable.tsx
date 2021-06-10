import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { ALL_USERS, ME } from "../../queries";
import { User } from "../../types";
import { usePagination, useTable } from "react-table";

interface TableData {
	idx: number;
	username: string;
	name: string;
	isChecked: string;
}

interface Column {
	Header: string;
	accessor: string;
}

interface CustomTableProps {
	data: TableData[];
	columns: Column<TableData>[];
}

const CustomTable = ({ data, columns }: CustomTableProps) => {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow } =
		useTable({ columns, data }, usePagination);
};

const UserTable = () => {
	const allUsers = useQuery(ALL_USERS);
	const me = useQuery(ME);
	const [friends, setFriends] = useState<string[]>(["no-friends"]);

	const columns = useMemo(
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

	const users = useMemo(
		() =>
			allUsers.data.getUsers.map((user: User) => {
				return {
					idx: i++,
					username: user.username,
					name: user.name,
					isChecked: friends.includes(user.username) ? "yes" : "no"
				};
			}),
		[isEmpty, friends]
	);

	useEffect(() => console.log(friends), [friends]);
	useEffect(() => {
		if (me.loading) return;
		setFriends(
			me.data.me.friends.map((f: User) => {
				return f.username;
			})
		);
	}, [me]);
	console.log(users);

	return (
		<>
			<CustomTable data={users} columns={columns} />
		</>
	);
};
export default UserTable;
