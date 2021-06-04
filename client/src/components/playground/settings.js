import { IconButton } from "@chakra-ui/button";
import {
	CloseIcon,
	EditIcon,
	HamburgerIcon,
	QuestionIcon,
	SearchIcon
} from "@chakra-ui/icons";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList
} from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import { useHistory } from "react-router";

const Settings = () => {
	const { push } = useHistory();
	const toast = useToast();

	const handleFriends = (e) => {
		e.preventDefault();
		push("/playground/friends");
	};

	const handleLogout = (e) => {
		e.preventDefault();
		push("/login");
		toast({
			variant: "left-accent",
			title: `Come back soon!`,
			status: "info",
			isClosable: "true"
		});
		localStorage.removeItem("login-token");
	};
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<Portal>
				<MenuList>
					<MenuGroup>
						<MenuItem icon={<SearchIcon />} onClick={handleFriends}>
							Find Friends
						</MenuItem>
						<MenuItem icon={<EditIcon />}>Profile</MenuItem>
						<MenuItem icon={<QuestionIcon />}>Help</MenuItem>
					</MenuGroup>

					<MenuDivider />
					<MenuGroup>
						<MenuItem icon={<CloseIcon />} onClick={handleLogout}>
							Logout
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Portal>
		</Menu>
	);
};

export default Settings;
