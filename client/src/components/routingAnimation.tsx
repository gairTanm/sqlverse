import { motion } from "framer-motion";
import React from "react";

const RoutingAnimation = ({ children }: { children: JSX.Element }) => {
	return (
		<motion.div
			style={{ overflowX: "hidden", overflowY: "hidden" }}
			initial={{ opacity: 0, y: 50, scale: 0.8 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -200, scale: 0.8 }}
			transition={{ duration: 0.4 }}
		>
			{children}
		</motion.div>
	);
};

export default RoutingAnimation;
