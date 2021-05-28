import { gql } from "@apollo/client";

export const ALL_USERS = gql`
	query {
		getUsers {
			username
			name
		}
	}
`;
