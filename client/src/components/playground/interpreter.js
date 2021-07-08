import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import { Box } from "@chakra-ui/react";
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
		<Editor
			height="100%"
			fontSize="10px"
			onChange={handleSqlChange}
			defaultLanguage="sql"
			theme="vs-dark"
			defaultValue="select * from employee"
		/>
	);
};

const SQLRepl = ({ db }) => {
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);
	const [sql, setSql] = useState("select * from employee");

	useEffect(() => {}, []);

	const handleSqlChange = (value, event) => {
		console.log("editor value: ", value);
		try {
			setResults(db.exec(value));
			setError(null);
		} catch (err) {
			setError(err);
			setResults([]);
		}
	};

	return (
		<div className="App">
			<Box position="absolute" left={0} w="40vw" h="100vh">
				<SQLEditor handleSqlChange={handleSqlChange} />
			</Box>
			<pre className="error">{(error || "").toString()}</pre>

			<pre>
				{results.map(({ columns, values }, i) => (
					<ResultsTable key={i} columns={columns} values={values} />
				))}
			</pre>
		</div>
	);
};

const ResultsTable = ({ columns, values }) => {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((columnName, i) => (
						<td key={i}>{columnName}</td>
					))}
				</tr>
			</thead>

			<tbody>
				{values.map((row, i) => (
					<tr key={i}>
						{row.map((value, i) => (
							<td key={i}>{value}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Interpreter;
