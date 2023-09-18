import { Box, Chip, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { PokemonType } from "../models/pokemon-types";
import { Search } from "@mui/icons-material";

export type Filters = {
	type?: PokemonType;
	secondary_type?: PokemonType;
};

export type FilterName = keyof Filters;

function AppliedFilters({ filters, handleDelete }: { filters: Filters; handleDelete: (filter: FilterName) => void }) {
	return (
		<Box
			sx={{
				position: "sticky",
				top: 0,
				bgcolor: "#222",
				zIndex: 1,
				boxShadow: "0 0 1rem #000",
				borderRadius: 1,
			}}
			padding="1rem">
			<Box display="flex">
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search Pokemon"
					inputProps={{ "aria-label": "search google maps" }}
				/>
				<IconButton>
					<Search></Search>
				</IconButton>
			</Box>

			<Stack direction="row" spacing={2}>
				{filters.type ? (
					<Chip className={filters.type} label={`Type: ${filters.type}`} onDelete={() => handleDelete("type")} />
				) : undefined}
				{filters.secondary_type ? (
					<Chip
						className={filters.secondary_type}
						label={`Secondary Type: ${filters.secondary_type}`}
						onDelete={() => handleDelete("secondary_type")}
					/>
				) : undefined}
			</Stack>
		</Box>
	);
}

export default AppliedFilters;
