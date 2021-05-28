import { gql } from "@apollo/client";

export const CREATE_USER = gql`
	mutation createUser(
		$username: String!
		$name: String!
		$password: String!
	) {
		createUser(
			data: { name: $name, username: $username, password: $password }
		) {
			username
			name
		}
	}
`;
