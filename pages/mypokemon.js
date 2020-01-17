import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import "./style.sass";
import PokemonCard from "../components/PokemonCard/index";
import { bindActionCreators } from "redux";
import { releasePokemon, changeName } from "../redux/action";

class Index extends React.Component {
  state = {
    name: ""
  };

  renderPokemon = () => {
    const { listPokemon } = this.props;
    return listPokemon.map(d => (
      <div className="column is-3">
        <PokemonCard
          name={`${d.nickName} (${d.pokemonName})`}
          pokemonID={d.pokemonID}
        >
          <button
            onClick={() => {
              this.releasePokemonID(d.id);
            }}
            className="button is-small is-black is-outlined is-fullwidth"
          >
            Release
          </button>
        </PokemonCard>
      </div>
    ));
  };

  setText = evt => {
    this.setState({
      [evt.target.name]: [evt.target.value]
    });
  };

  componentDidMount() {
    const { name } = this.props;
    this.setState({
      name
    });
  }

  releasePokemonID = id => {
    const { releasePokemon, listPokemon } = this.props;

    const isConfirm = confirm("Are you sure want to release this pokemon?");
    if (isConfirm) releasePokemon(id, listPokemon);
  };

  handleChangeName = () => {
    const { name } = this.state;
    const { changeName } = this.props;

    changeName(name);
  };

  render() {
    const { listPokemon } = this.props;
    const { name } = this.state;

    return (
      <>
        <Layout isTransparent>
          <div className="fullscreen">
            <div className="container">
              <div className="title is-2 is-spaced">My Pokemon List</div>
              <div className="title is-5">Name</div>
              <input
                class="input"
                type="text"
                name="name"
                value={name}
                onChange={this.setText}
              />
              <div className="input-wrapper">
                <button
                  onClick={this.handleChangeName}
                  className="button is-small is-black is-outlined"
                >
                  Submit
                </button>
              </div>
              <div className="title is-5">Total Owned Pokemon</div>
              <div className="subtitle is-5 is-spaced">
                {listPokemon.length}
              </div>
              <div className="title is-5">List of Pokemons</div>
              <div className="columns is-multiline">{this.renderPokemon()}</div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = ({ name, listPokemon }) => ({ name, listPokemon });
const mapDispatchToProps = dispatch => {
  return {
    releasePokemon: bindActionCreators(releasePokemon, dispatch),
    changeName: bindActionCreators(changeName, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
