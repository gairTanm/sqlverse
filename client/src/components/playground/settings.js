import { IconButton } from "@chakra-ui/button";
import {
	CloseIcon,
	EditIcon,
	HamburgerIcon,
	QuestionIcon,
	SearchIcon,
} from "@chakra-ui/icons";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import React from "react";

const Settings = () => {
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
						<MenuItem icon={<SearchIcon />}>Find Friends</MenuItem>
						<MenuItem icon={<EditIcon />}>Profile</MenuItem>
						<MenuItem icon={<QuestionIcon />}>Help</MenuItem>
					</MenuGroup>

					<MenuDivider />
					<MenuGroup>
						<MenuItem icon={<CloseIcon />}>Logout</MenuItem>
					</MenuGroup>
				</MenuList>
			</Portal>
		</Menu>
	);
};

export default Settings;
