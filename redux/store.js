import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { actionTypes } from "./const";

const exampleInitialState = {
  storageID: 1,
  name: "Ash Ketchum",
  listPokemon: [],
  detailID: 1
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POKEMON:
      return {
        ...state,
        listPokemon: action.pokemons
      };
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        name: action.name
      };
    case actionTypes.INCREMENT_ID:
      return {
        ...state,
        storageID: action.id
      };
    case actionTypes.SET_DETAIL:
      return {
        ...state,
        detailID: action.id
      };
    default:
      return state;
  }
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
