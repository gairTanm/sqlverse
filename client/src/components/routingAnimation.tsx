import { motion } from "framer-motion";
import React from "react";

const RoutingAnimation = ({ children }) => {
	return (
		<motion.div
			style={{ overflowX: "hidden" }}
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
		>
			{children}
		</motion.div>
	);
};

export default RoutingAnimation;
