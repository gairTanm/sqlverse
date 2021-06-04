import React from "react";

export interface ClickHandlerBase {
	clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BarButtonProps extends ClickHandlerBase {
	text: string;
}
