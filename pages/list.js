import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout/index";
import "./style.sass";
import PokemonCard from "../components/PokemonCard/index";
import { getPokemons } from "../helper/http";
import Router from "next/router";
import { changeDetailID } from "../redux/action";
import { bindActionCreators } from "redux";

class List extends React.Component {
  state = {
    isLoading: true,
    pokemons: [],
    mapOwned: {}
  };

  componentDidMount() {
    this.fetchPokemon();
    this.setTotalOwnedPokemon();
  }

  setTotalOwnedPokemon = () => {
    const { listPokemon } = this.props;
    const obj = {};
    listPokemon.forEach(d => {
      obj[d.pokemonID] ? obj[d.pokemonID]++ : (obj[d.pokemonID] = 1);
    });

    this.setState({
      mapOwned: obj
    });
  };

  getPokemonIDFromURL = url => {
    const split = url.split("/");

    return split[split.length - 2];
  };

  fetchPokemon = () => {
    getPokemons({ limit: 151 })
      .then(response => response.json())
      .then(pokemons => {
        this.setState({
          isLoading: false,
          pokemons: pokemons.results.map(d => ({
            id: this.getPokemonIDFromURL(d.url),
            name: d.name
          }))
        });
      });
  };

  handleRef = id => {
    const { changeDetailID } = this.props;

    changeDetailID(id);
    Router.push(`/detail`);
  };

  renderPokemon = () => {
    const { pokemons, mapOwned } = this.state;

    return pokemons.map(d => (
      <div
        onClick={() => {
          this.handleRef(d.id);
        }}
        className="column is-3"
      >
        <PokemonCard isRef name={d.name} pokemonID={d.id}>
          <div className="subtitle is-6">
            Owned : {mapOwned[d.id] ? mapOwned[d.id] : 0}
          </div>
        </PokemonCard>
      </div>
    ));
  };

  render() {
    const { isLoading } = this.state;

    return (
      <>
        <Layout isTransparent>
          <div className="fullscreen">
            <div className="container">
              <div className="title is-1 is-spaced">Pokemon List</div>
              <div className="columns is-multiline">
                {!isLoading && this.renderPokemon()}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = ({ listPokemon }) => ({ listPokemon });
const mapDispatchToProps = dispatch => {
  return {
    changeDetailID: bindActionCreators(changeDetailID, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
