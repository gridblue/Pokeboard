import {
	AppBar,
	Avatar,
	Box,
	Button,
	Dialog,
	DialogTitle,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { Pokemon } from "../models/pokemon";
import { Close } from "@mui/icons-material";

function PokemonDetailsDialog({
	pokemon,
	open,
	handleClose,
}: {
	pokemon?: Pokemon;
	open: boolean;
	handleClose: () => void;
}) {
	let theme = useTheme();

	return pokemon ? (
		<Dialog open={open || false} onClose={handleClose}>
			<AppBar position="relative">
				<Toolbar>
					<Typography>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}</Typography>
					<Box flexGrow={1}></Box>
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<Close />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				sx={{ padding: "1rem" }}
				display="flex"
				gap="3rem"
				alignItems="center"
				justifyContent="center"
				flexWrap="wrap">
				<Box display="flex" flexDirection="column" gap="0.25rem">
					<Avatar
						src={pokemon.art}
						sx={{
							width: "200px",
							height: "200px",
							overflow: "visible",
							border: "10px solid #0005",
							outline: "2px solid #0009",
						}}
						variant="rounded"
						className={pokemon.primary_type}></Avatar>
					<Typography fontFamily="monospace" textAlign="center">
						{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
					</Typography>
					<Box display="flex" gap="0.5rem" alignItems="center" flexWrap="wrap" alignSelf="center">
						<Button
							sx={{
								padding: "0 10px",
								border: "2px solid #fff5",
								lineHeight: "20px",
								fontFamily: "monospace",
								color: "white",
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
								className={pokemon.secondary_type}>
								{pokemon.secondary_type}
							</Button>
						) : undefined}
					</Box>
				</Box>
				<Box display="flex" flexDirection="column" gap="1rem">
					<Typography textAlign="center" variant="h6" fontFamily="monospace">
						Stats
					</Typography>
					<Box display="flex" flexDirection="column" gap="0.25rem">
						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace">
								HP:
							</Typography>

							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#A6000020", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.hp / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#A60000", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.hp}
								</Typography>
							</Box>
						</Box>
						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace">
								Attack:
							</Typography>
							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#9C531F20", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.attack / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#9C531F", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.attack}
								</Typography>
							</Box>
						</Box>
						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace">
								Defence:
							</Typography>
							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#A1871F20", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.defence / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#A1871F", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.defence}
								</Typography>
							</Box>
						</Box>

						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace" whiteSpace="nowrap">
								Sp. Atk:
							</Typography>
							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#445E9C20", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.special_attack / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#445E9C", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.special_attack}
								</Typography>
							</Box>
						</Box>

						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace" whiteSpace="nowrap">
								Sp. Def:
							</Typography>
							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#4E823420", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.special_defence / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#4E8234", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.special_defence}
								</Typography>
							</Box>
						</Box>
						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace" whiteSpace="nowrap">
								Speed:
							</Typography>
							<Box
								width="220px"
								border="3px solid #0005"
								height="24px"
								position="relative"
								textAlign="center"
								borderRadius="3px"
								overflow="hidden"
								sx={{ bgcolor: "#A1395920", isolation: "isolate" }}>
								<Box
									left="0"
									position="absolute"
									width={`${pokemon.speed / 2.55}%`}
									height="100%"
									sx={{ bgcolor: "#A13959", zIndex: "-1" }}
									textAlign="center"></Box>
								<Typography lineHeight="20px" fontFamily="monospace">
									{pokemon.speed}
								</Typography>
							</Box>
						</Box>
						<Box display="grid" gap="0.25rem" gridTemplateColumns="80px 1fr">
							<Typography textAlign="end" fontFamily="monospace" whiteSpace="nowrap">
								Total:
							</Typography>
							<Typography textAlign="center" fontFamily="monospace">
								{pokemon.attack +
									pokemon.defence +
									pokemon.special_attack +
									pokemon.special_defence +
									pokemon.speed +
									pokemon.hp}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Dialog>
	) : null;
}

export default PokemonDetailsDialog;
