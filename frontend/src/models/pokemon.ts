import { PokemonType } from "./pokemon-types";

export type Pokemon = {
	pokedex_id: string;
	name: string;
	height: number;
	weight: number;
	art: string;
	primary_type: PokemonType;
	secondary_type: PokemonType;
	hp: number;
	attack: number;
	defence: number;
	special_attack: number;
	special_defence: number;
	speed: number;
};
