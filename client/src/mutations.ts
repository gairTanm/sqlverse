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

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const ADD_FRIEND = gql`
	mutation addFriend($username: String!) {
		addAsFriend(username: $username) {
			friendName
			username
		}
	}
`;

export const REMOVE_FRIEND = gql`
	mutation removeFriend($friendname: String!) {
		removeFriend(friendname: $friendname) {
			friendName
		}
	}
`;
