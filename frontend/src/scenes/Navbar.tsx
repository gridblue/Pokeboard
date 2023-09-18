import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import pokeball from "../assets/pokeball.png";
import App from "../App";

function Navbar() {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Box display="flex" gap="1rem" alignItems="center">
					<Avatar src={pokeball}></Avatar>
					<Typography variant="h6">PokémonDB</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
