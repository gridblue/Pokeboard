export const pokemonTypes = [
	"bug",
	"dark",
	"dragon",
	"electric",
	"fairy",
	"fighting",
	"fire",
	"flying",
	"ghost",
	"ground",
	"grass",
	"ice",
	"normal",
	"poison",
	"psychic",
	"rock",
	"steel",
	"water",
	"none",
] as const;

export type PokemonType = typeof pokemonTypes[number];
