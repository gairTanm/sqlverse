const CopyPlugin = require("copy-webpack-plugin");

module.exports = function override(config) {
	config.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: "node_modules/sql.js/dist/sql-wasm.wasm",
					to: "static/js/"
				}
			]
		})
	);
	return config;
};
