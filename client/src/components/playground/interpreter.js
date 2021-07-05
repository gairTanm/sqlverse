import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import { Textarea } from "@chakra-ui/react";

import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

const Interpreter = () => {
	const [db, setDb] = useState(null);
	const [error, setError] = useState(null);

	useEffect(async () => {
		try {
			const SQL = await initSqlJs({ locateFile: () => sqlWasm });
			setDb(new SQL.Database());
		} catch (err) {
			setError(err);
		}
	}, []);

	if (error) return <pre>{error.toString()}</pre>;
	else if (!db) return <pre>Loading...</pre>;
	else return <SQLRepl db={db} />;
};

function SQLRepl({ db }) {
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);

	function exec(sql) {
		try {
			setResults(db.exec(sql)); // an array of objects is returned
			setError(null);
		} catch (err) {
			setError(err);
			setResults([]);
		}
	}

	return (
		<div className="App">
			<h1>React SQL interpreter</h1>

			<Textarea
				onChange={(e) => exec(e.target.value)}
				placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
			/>

			<pre className="error">{(error || "").toString()}</pre>

			<pre>
				{results.map(({ columns, values }, i) => (
					<ResultsTable key={i} columns={columns} values={values} />
				))}
			</pre>
		</div>
	);
}

function ResultsTable({ columns, values }) {
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
}

export default Interpreter;
