import { actionTypes } from "./const";

export const setPokemon = pokemons => ({
  type: actionTypes.SET_POKEMON,
  pokemons
});

export const setProfile = name => ({
  type: actionTypes.SET_PROFILE,
  name
});

export const setDetail = id => ({
  type: actionTypes.SET_DETAIL,
  id
});

export const incrementStorageID = id => ({
  type: actionTypes.INCREMENT_ID,
  id: id + 1
});

export const releasePokemon = (id, pokemons) => dispatch => {
  const releasedPokemon = pokemons.filter(d => d.id !== id);

  return dispatch(setPokemon(releasedPokemon));
};

export const catchPokemon = (pokemon, pokemons) => dispatch => {
  dispatch(setPokemon([...pokemons, pokemon]));
  dispatch(incrementStorageID(pokemon.id));
};

export const changeName = name => dispatch => {
  return dispatch(setProfile(name));
};

export const changeDetailID = id => dispatch => {
  return dispatch(setDetail(id));
};
