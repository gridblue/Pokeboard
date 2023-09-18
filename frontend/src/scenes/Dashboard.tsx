import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../models/pokemon";
import { PokemonType } from "../models/pokemon-types";
import { Filters } from "./AppliedFilters";
import PokemonDetailsDialog from "./PokemonDetailsDialog";

function Dashbard({
	filters,
	primaryTypeSelect,
	secondaryTypeSelect,
	handleView,
}: {
	filters: Filters;
	primaryTypeSelect: (type: PokemonType) => void;
	secondaryTypeSelect: (type: PokemonType) => void;
	handleView: (pokemon: Pokemon) => void;
}) {
	const [data, setData] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);

		axios
			.get<Pokemon[]>("http://localhost:5000/api/getall/0/100", {
				params: filters,
			})
			.then((result) => {
				setData(result.data);
				setLoading(false);
			});
	}, [filters]);

	const theme = useTheme();

	return (
		<>
			<TableContainer component={Paper}>
				{!loading ? (
					data.length > 0 ? (
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									{/* <TableCell colSpan={2}>Pokédex ID</TableCell> */}
									<TableCell colSpan={2}>ID</TableCell>

									<TableCell>Name</TableCell>
									<TableCell>Type</TableCell>
									{/* <TableCell align="right">Height (m)</TableCell>
						<TableCell align="right">Weight (Kg)</TableCell> */}
									<TableCell sx={{ display: "none" }}>Stats</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((pokemon) => (
									<TableRow
										key={pokemon.pokedex_id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
										onClick={() => handleView(pokemon)}
										role="button">
										<TableCell>{pokemon.pokedex_id}</TableCell>
										<TableCell>
											<Avatar
												src={pokemon.art}
												className={pokemon.primary_type}
												alt={`${pokemon.name} image`}
												sx={{
													height: "auto",
													width: "auto",
													maxHeight: "150px",
													maxWidth: "150px",
													minHeight: "50px",
													minWidth: "50px",
													overflow: "visible",
												}}></Avatar>
										</TableCell>
										<TableCell>
											<Typography>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}</Typography>
										</TableCell>
										<TableCell>
											<Box display="flex" gap="0.5rem" alignItems="center" flexWrap="wrap">
												<Button
													sx={{
														padding: "0 10px",
														border: "2px solid #fff5",
														lineHeight: "20px",
														fontFamily: "monospace",
														color: "white",
													}}
													onClick={(ev) => {
														ev.stopPropagation();
														primaryTypeSelect(pokemon.primary_type);
													}}
													className={pokemon.primary_type}>
													{pokemon.primary_type}
												</Button>
												{pokemon.secondary_type !== "none" ? (
													<Button
														sx={{
															padding: "0 10px",
															border: "2px solid #fff5",
															lineHeight: "20px",
															fontFamily: "monospace",
															color: "white",
														}}
														onClick={(ev) => {
															ev.stopPropagation();
															secondaryTypeSelect(pokemon.secondary_type);
														}}
														className={pokemon.secondary_type}>
														{pokemon.secondary_type}
													</Button>
												) : undefined}
											</Box>
										</TableCell>
										{/* <TableCell align="right">{pokemon.height / 10} </TableCell>
							<TableCell align="right">{pokemon.weight / 10} </TableCell> */}
										{/* <TableCell sx={{ display: "none" }}>
											<Box display="flex" flexDirection="column" gap="0.5rem">
												<Tooltip title="HP" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#A6000020", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.hp / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#A60000", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.hp}</Typography>
													</Box>
												</Tooltip>
												<Tooltip title="Attack" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#9C531F20", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.attack / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#9C531F", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.attack}</Typography>
													</Box>
												</Tooltip>
												<Tooltip title="Defence" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#A1871F20", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.defence / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#A1871F", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.defence}</Typography>
													</Box>
												</Tooltip>
												<Tooltip title="Special Attack" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#445E9C20", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.special_attack / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#445E9C", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.special_attack}</Typography>
													</Box>
												</Tooltip>
												<Tooltip title="Special Defence" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#4E823420", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.special_defence / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#4E8234", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.special_defence}</Typography>
													</Box>
												</Tooltip>
												<Tooltip title="Speed" placement="left">
													<Box
														marginRight="auto"
														width="200px"
														height="15px"
														position="relative"
														textAlign="center"
														borderRadius="3px"
														overflow="hidden"
														sx={{ bgcolor: "#A1395920", isolation: "isolate" }}>
														<Box
															left="0"
															position="absolute"
															width={`${pokemon.speed / 1.5}%`}
															height="100%"
															sx={{ bgcolor: "#A13959", zIndex: "-1" }}
															textAlign="center"></Box>
														<Typography lineHeight="15px">{pokemon.speed}</Typography>
													</Box>
												</Tooltip>
											</Box>
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<Typography variant="h4" textAlign="center" sx={{ paddingY: "1rem", opacity: "0.5" }}>
							No Results
						</Typography>
					)
				) : undefined}
				{loading ? (
					<Box display="flex" alignItems="center" justifyContent="center" padding="1rem">
						<CircularProgress></CircularProgress>
					</Box>
				) : undefined}
			</TableContainer>
		</>
	);
}

export default Dashbard;
