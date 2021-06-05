import React from "react";

export interface ClickHandlerBase {
	clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BarButtonProps extends ClickHandlerBase {
	text: string;
}

export interface TestimonialTemplateProps {
	image: string;
	text: string;
	left: boolean;
	name: string;
	alt: string;
	title: string;
}

export interface LoadingProps {
	loading?: boolean;
}

export interface User {
	username: string;
	name: string;
}

export interface MotionButtonProps {
	type?: "submit";
	variant?: "solid" | "ghost" | "outline" | "link";
	label: string;
	loading?: boolean;
	colorScheme: string;
	isDisabled?: boolean;
	onClick?: React.MouseEventHandler;
}

export interface FormItemBase {
	isRequired?: boolean;
	label: string;
	placeholder: string;
	value: string;
	onChange: React.ChangeEventHandler;
	error: string | undefined;
	touched: boolean | undefined;
	variant?: "filled" | "ghost" | "outline" | "solid";
}

export interface SecureFormItemProps extends FormItemBase {
	show: boolean;
	toggle: React.MouseEventHandler;
}

export interface MailFormItemProps {
	isRequired?: boolean;
	type: "email" | "text";
	value: string;
	onChange: React.ChangeEventHandler;
	label: string;
	placeholder: string;
}
