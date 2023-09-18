import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ExpandLess, ExpandMore } from "@mui/icons-material/";
import { Collapse } from "@mui/material";
import { PokemonType, pokemonTypes } from "../models/pokemon-types";

function useOpenState(state: boolean) {
	const [open, setOpen] = React.useState(state);
	const handleClick = () => setOpen(!open);
	return [open, handleClick] as const;
}

export default function Sidebar({
	primaryTypeSelect,
	secondaryTypeSelect,
}: {
	primaryTypeSelect: (type: PokemonType) => void;
	secondaryTypeSelect: (type: PokemonType) => void;
}) {
	const [openPrimary, handleOpenPrimary] = useOpenState(false);
	const [openSecondary, handleOpenSecondary] = useOpenState(false);

	return (
		<Box
			display="flex"
			flexDirection="column"
			sx={{
				width: "100%",
				bgcolor: "background.black",
				position: "sticky",
				top: 0,
			}}>
			<nav aria-label="Filters">
				<List>
					<ListItemButton onClick={handleOpenPrimary}>
						<ListItemText primary="Type" />
						{openPrimary ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openPrimary} timeout="auto" unmountOnExit>
						{pokemonTypes.map((type) =>
							type !== "none" ? (
								<ListItemButton className={type} key={type} sx={{ pl: 4 }} onClick={() => primaryTypeSelect(type)}>
									<ListItemText primary={type.charAt(0).toUpperCase() + type.substring(1)} />
								</ListItemButton>
							) : undefined
						)}
					</Collapse>
					<ListItemButton onClick={handleOpenSecondary}>
						<ListItemText primary="Secondary Type" />
						{openSecondary ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openSecondary} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{pokemonTypes.map((type) => (
								<ListItemButton className={type} key={type} sx={{ pl: 4 }} onClick={() => secondaryTypeSelect(type)}>
									<ListItemText primary={type.charAt(0).toUpperCase() + type.substring(1)} />
								</ListItemButton>
							))}
						</List>
					</Collapse>
				</List>
			</nav>
		</Box>
	);
}
