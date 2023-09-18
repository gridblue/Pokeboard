from flask import Flask, jsonify, request
import requests
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/api/getall/*": {"origins": "*"}})

# Connecting to mongodb
mongodb_client = PyMongo(
    app, uri="mongodb+srv://tejussrao:jv2vEZb8a80QLw2s@reportingdata.bvhb272.mongodb.net/pokemon_db")
database = mongodb_client.db


def get_filters(filters):
    filters_dict = {}
    pokemon_type = filters.get("type")
    pokemon_secondary_type = filters.get("secondary_type")
    pokedex_id = filters.get("pokedex_id")
    pokedex_name = filters.get("pokemon_name")
    if (pokemon_type):
        filters_dict["primary_type"] = pokemon_type
    if (pokemon_secondary_type):
        filters_dict["secondary_type"] = pokemon_secondary_type
    if (pokedex_id):
        filters_dict["pokedex_id"] = pokedex_id
    if (pokedex_name):
        filters.dict["name"] = pokedex_name
    return filters_dict

@app.route('/api/pokemonnames')
@cross_origin()
def get_literally_all():
    # Querying a single pokemon by its name
    filters = request.args
    pokemons = database.pokeapicollection.find({filters}, {"_id":  0,}).sort("pokedex_id")
    response = jsonify([pokemon for pokemon in pokemons])
    return response

@app.route('/api/pokemon/<int:skip_no>/<int:limit_no>')
@cross_origin()
def get_all(skip_no, limit_no):
    # Querying by pokemon types
    filters = request.args
    #when user wants to query all
    if (not filters):
        pokemons = database.pokeapicollection.find({},{"id" : 0}).skip(skip_no).limit(limit_no)
    #when user speciically wants to query by type
    pokemons = database.pokeapicollection.find(get_filters(filters), {"_id":  0}).skip(
        skip_no).limit(limit_no).sort("pokedex_id")
    response = jsonify([pokemon for pokemon in pokemons])
    return response

@app.route('/api/pokemon/<int:pokemon_id>')
@cross_origin()
def get(pokemon_id):
    # Querying a single pokemon by id
    filters = request.args
    pokemon = database.pokeapicollection.find_one(get_filters(filters), {"_id": 0})
    response = jsonify(pokemon)
    return response


app.run()
