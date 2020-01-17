import fetch from "isomorphic-unfetch";
import qs from "qs";

export const getPokemonImageURL = id =>
  `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

export const getPokemonByID = id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

export const getPokemons = (req = { limit: 20 }) =>
  fetch(`https://pokeapi.co/api/v2/pokemon?${qs.stringify(req)}`);
