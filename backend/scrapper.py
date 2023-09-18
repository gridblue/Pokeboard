import pokebase
from pymongo import MongoClient
import time
from os import getenv
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)

MONGO_CONN_STR = getenv('MONGODB_CONNECTION_STRING')

client = MongoClient(MONGO_CONN_STR)
database = client.pokemon_db

for i in range (1,1282):
    pokemon = pokebase.pokemon(i)
    p_name = pokemon.name
    p_art = getattr(pokemon.sprites.other, "official-artwork").front_default
    p_weight =  pokemon.weight
    p_height = pokemon.height
    p_types = []
    for type in pokemon.types:
        p_types.append(type.type.name)
    if len(p_types) != 2:
        p_types.append("none")
    p_hp = pokemon.stats[0].base_stat
    p_attack =  pokemon.stats[1].base_stat
    p_defense = pokemon.stats[2].base_stat
    p_sattack = pokemon.stats[3].base_stat
    p_sdefence = pokemon.stats[4].base_stat
    p_speed = pokemon.stats[5].base_stat
    
    #inserting each record
    database.pokeapicollection.insert_one({
    "name": p_name,
    "weight":p_weight,
    "height":p_height,
    "primary_type":p_types[0],
    "secondary_type":p_types[1],
    "art":p_art,
    "hp":p_hp,
    "attack":p_attack,
    "defence":p_defense,
    "special_attack":p_sattack,
    "special_defence":p_sdefence,
    "speed": p_speed})

    print(f"pokemon ${p_name} appended to collection !!")
    time.sleep(4)
