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
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import { useHistory } from "react-router";

import schema from "../../assets/schema.svg";

const Settings = () => {
	const { push } = useHistory();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

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
			onClick: onOpen,
			text: "Help"
		},
		{
			icon: <></>,
			onClick: undefined,
			text: "My Friends"
		}
	];

	return (
		<>
			<Modal size="full" onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Schema</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<img src={schema} alt="schema" />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

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
							<MenuItem
								icon={<CloseIcon />}
								onClick={handleLogout}
							>
								Logout
							</MenuItem>
						</MenuGroup>
					</MenuList>
				</Portal>
			</Menu>
		</>
	);
};

export default Settings;
