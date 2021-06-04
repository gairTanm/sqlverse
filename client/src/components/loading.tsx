import { Box, Center } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import skater from "../assets/skaterwolf.gif";

const container = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 3,
			ease: [0.6, -0.05, 0.01, 0.99]
		}
	},
	exit: {
		opacity: 0
	}
};

const MotionBox = motion(Box);

interface LoadingProps {
	loading?: boolean;
}

const Loading = ({ loading }: LoadingProps): JSX.Element => {
	return (
		<AnimatePresence>
			{loading && (
				<MotionBox
					variants={container}
					initial="initial"
					animate="animate"
					exit="exit"
					w="100%"
					h="100%"
					bg="#FF7679"
				>
					<Center h="100vh">
						<img src={skater} alt="skrrt" />
					</Center>
				</MotionBox>
			)}
		</AnimatePresence>
	);
};

export default Loading;
