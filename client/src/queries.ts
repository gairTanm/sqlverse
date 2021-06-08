import { gql } from "@apollo/client";

export const ALL_USERS = gql`
	query {
		getUsers {
			username
			name
			friends {
				username
				name
			}
		}
	}
`;

export const ME = gql`
	query {
		me {
			username
			name
			friends {
				username
				name
			}
		}
	}
`;
