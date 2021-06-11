import { useQuery } from "@apollo/client";
import { ME } from "../../queries";
import React from "react";

const Friends = () => {
	const { data, loading, error, refetch } = useQuery(ME);

	return <></>;
};

export default Friends;
