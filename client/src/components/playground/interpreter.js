import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import {
	Box,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from "@chakra-ui/react";
import database from "../../assets/Northwind_small.sqlite";

import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import Editor from "@monaco-editor/react";

const Interpreter = () => {
	const [db, setDb] = useState();
	const [error, setError] = useState(null);

	useEffect(async () => {
		try {
			const SQL = await initSqlJs({ locateFile: () => sqlWasm });
			let xhr = new XMLHttpRequest();
			xhr.open("GET", database, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = () => {
				let uInt8Array = new Uint8Array(xhr.response);
				setDb(new SQL.Database(uInt8Array));
			};
			xhr.send();
		} catch (err) {
			setError(err);
		}
	}, []);

	if (error) return <pre>{error.toString()}</pre>;
	else if (!db) return <pre>Loading...</pre>;
	else return <SQLRepl db={db} />;
};
const SQLEditor = ({ handleSqlChange }) => {
	return (
		<>
			<Text fontFamily="Hachi Maru Pop" fontStyle="oblique">
				Try writing SQL commands and watch for changes!
			</Text>
			<Editor
				height="100%"
				onChange={handleSqlChange}
				defaultLanguage="sql"
				theme="vs-dark"
				defaultValue="select * from employee"
			/>
		</>
	);
};

const SQLRepl = ({ db }) => {
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);
	const [sql, setSql] = useState("select * from employee");

	useEffect(() => {
		setResults(db.exec(sql));
		setError(null);
	}, []);

	const handleSqlChange = (value, event) => {
		try {
			setResults(db.exec(value));
			setError(null);
		} catch (err) {
			setError(err);
			setResults([]);
		}
	};

	return (
		<Flex direction="row">
			<Box left={0} w="40vw" h="50vh">
				<SQLEditor handleSqlChange={handleSqlChange} />
			</Box>
			<Flex direction="column" w="60vw">
				<pre className="error">{(error || "").toString()}</pre>
				{results.map(({ columns, values }, i) => (
					<ResultsTable key={i} columns={columns} values={values} />
				))}
			</Flex>
		</Flex>
	);
};

const ResultsTable = ({ columns, values }) => {
	return (
		<TableContainer>
			<Table size="sm" colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						{columns.map((columnName, i) => (
							<Th key={i}>{columnName}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{values.map((row, i) => (
						<Tr key={i}>
							{row.map((value, i) => {
								value = String(value);
								return (
									<Td fontSize="xs" key={i}>
										{value}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default Interpreter;
