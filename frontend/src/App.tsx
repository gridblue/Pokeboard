import { useState } from "react";
import "./App.css";
import Navbar from "./scenes/Navbar";
import Sidebar from "./scenes/Sidebar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Dashboard from "./scenes/Dashboard";
import AppliedFilters, { Filters } from "./scenes/AppliedFilters";
import { PokemonType } from "./models/pokemon-types";
import PokemonDetailsDialog from "./scenes/PokemonDetailsDialog";
import { Pokemon } from "./models/pokemon";

function App() {
	const [count, setCount] = useState(0);
	const [filters, setFilters] = useState<Filters>({});
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(undefined);

	const theme = createTheme({
		palette: { mode: "dark" },
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline></CssBaseline>
			<PokemonDetailsDialog
				pokemon={selectedPokemon}
				open={selectedPokemon !== undefined}
				handleClose={() => setSelectedPokemon(undefined)}></PokemonDetailsDialog>

			<Box
				display="grid"
				sx={{ gridTemplateAreas: `"Navbar" "Dashboard"`, minHeight: "100vh" }}
				gridTemplateColumns="1fr"
				gridTemplateRows="64px 1fr">
				<Box gridArea="Navbar">
					<Navbar></Navbar>
				</Box>
				<Box
					gridArea="Dashboard"
					sx={{ minWidth: 300, maxWidth: 1000, marginInline: "auto", p: 1 }}
					display="flex"
					flexDirection="column"
					gap="1rem">
					<AppliedFilters
						filters={filters}
						handleDelete={(filter) => {
							setFilters((filters) => ({ ...filters, [filter]: undefined }));
						}}></AppliedFilters>
					<Dashboard
						handleView={(pokemon) => setSelectedPokemon(pokemon)}
						filters={filters}
						primaryTypeSelect={(type) => {
							setFilters((filters) => ({ ...filters, type }));
						}}
						secondaryTypeSelect={(type) => {
							setFilters((filters) => ({ ...filters, secondary_type: type }));
						}}></Dashboard>
				</Box>
				{/* <Box gridArea="Sidebar">
					<Sidebar
						primaryTypeSelect={(type) => {
							setFilters((filters) => ({ ...filters, type }));
						}}
						secondaryTypeSelect={(type) => {
							setFilters((filters) => ({ ...filters, secondary_type: type }));
						}}></Sidebar>
				</Box> */}
			</Box>
		</ThemeProvider>
	);
}

export default App;
