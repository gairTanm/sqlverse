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

	const handleFriends = (e: React.MouseEvent) => {
		e.preventDefault();
		push("/playground/friends");
	};

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		push("/login");
		toast({
			variant: "left-accent",
			title: `Come back soon!`,
			status: "info",
			isClosable: true
		});
		localStorage.removeItem("login-token");
	};

	const MenuItems = [
		{
			icon: <SearchIcon />,
			onClick: handleFriends,
			text: "Find Friends"
		},
		{
			icon: <EditIcon />,
			onClick: undefined,
			text: "Profile"
		},
		{
			icon: <QuestionIcon />,
			onClick: undefined,
			text: "Help"
		},
		{
			icon: <></>,
			onClick: undefined,
			text: "My Friends"
		}
	];

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
						{MenuItems.map((mi) => {
							return (
								<MenuItem
									key={mi.text}
									icon={mi.icon}
									onClick={mi.onClick}
								>
									{mi.text}
								</MenuItem>
							);
						})}
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
