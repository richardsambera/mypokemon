import { connect } from "react-redux";
import Layout from "../components/Layout/index";
import "./style.sass";
import { getPokemonImageURL, getPokemonByID } from "../helper/http";
import { bindActionCreators } from "redux";
import { catchPokemon } from "../redux/action";

class Detail extends React.Component {
  state = {
    isCatch: false,
    catchMsg: "",
    isSuccess: false,
    submitMsg: "",
    name: "",
    id: 0,
    pokemon: {}
  };

  componentDidMount() {
    const { detailID } = this.props;
    this.fetchPokemon(detailID);
  }

  fetchPokemon = async id => {
    const pokemon = await getPokemonByID(id).then(res => res.json());
    this.setState({
      pokemon
    });
  };

  setText = evt => {
    this.setState({
      [evt.target.name]: [evt.target.value]
    });
  };

  handleCatch = () => {
    const { pokemon } = this.state;
    const isSuccess = Math.floor(Math.random() * 2) > 0;
    let catchMsg = "Oops, please try again!";
    if (isSuccess) catchMsg = "Congrats, the pokemon is yours!";
    this.setState({
      isCatch: false,
      catchMsg,
      isSuccess,
      submitMsg: "",
      name: pokemon.name,
      pokemonName: pokemon.name,
      id: pokemon.id
    });
  };

  handleStorePokemon = () => {
    const { id, name, pokemonName } = this.state;
    const { storageID, listPokemon, catchPokemon } = this.props;
    const pokemon = {
      id: storageID,
      nickName: name,
      pokemonName: pokemonName,
      pokemonID: id
    };

    catchPokemon(pokemon, listPokemon);

    this.setState({
      isSuccess: false,
      isCatch: false,
      catchMsg: "",
      submitMsg: "Saved, go to My pokemon to see your pokemon!"
    });
  };

  render() {
    const { pokemon } = this.state;
    const { detailID } = this.props;
    const { isCatch, catchMsg, isSuccess, name, submitMsg } = this.state;

    return (
      <Layout isTransparent>
        <div className="fullscreen">
          <div className="container">
            <div className="title is-2 is-spaced">Pokemon Detail</div>
            <div className="columns">
              <div className="column is-4" align="center">
                <img
                  className="pokemon-img"
                  src={getPokemonImageURL(detailID)}
                  alt={pokemon.name}
                />
                <div className="title is-2 is-capitalized">{pokemon.name}</div>
                <div className="catch-wrapper">
                  {isCatch && !isSuccess && (
                    <img
                      className="pokemon-img"
                      src="/static/img/catch.gif"
                      alt="catch"
                    />
                  )}
                  {!isCatch && !isSuccess && (
                    <button
                      onClick={() => {
                        this.setState(
                          { isCatch: true, isSuccess: false, catchMsg: "" },
                          () => {
                            setTimeout(this.handleCatch, 3000);
                          }
                        );
                      }}
                      className="button is-large is-black is-outlined is-fullwidth"
                    >
                      Catch
                    </button>
                  )}
                  {catchMsg != "" && (
                    <div className="catch-wrapper">{catchMsg}</div>
                  )}
                  {isSuccess && (
                    <>
                      <div className="subtitle is-5">
                        Please input your nickname
                      </div>
                      <input
                        class="input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.setText}
                      />
                      <div className="catch-wrapper">
                        <button
                          onClick={this.handleStorePokemon}
                          className="button is-medium is-black is-outlined is-fullwidth"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                  {submitMsg != "" && (
                    <div className="catch-wrapper">{submitMsg}</div>
                  )}
                </div>
              </div>
              <div className="column is-8">
                <div className="title is-5">Types</div>
                <div className="subtitle is-5 is-spaced">
                  {pokemon.types &&
                    pokemon.types.map(d => d.type.name).join(", ")}
                </div>
                <div className="title is-5">Abilities</div>
                <div className="subtitle is-5 is-spaced">
                  {pokemon.abilities &&
                    pokemon.abilities.map(d => d.ability.name).join(", ")}
                </div>
                <div className="title is-5">List of Moves</div>
                <div className="scrollable-content">
                  <div className="columns is-multiline">
                    {pokemon.moves &&
                      pokemon.moves.map(d => (
                        <div className="column is-2 is-capitalized">
                          {d.move.name.replace("-", " ")}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ storageID, name, listPokemon, detailID }) => ({
  storageID,
  name,
  listPokemon,
  detailID
});
const mapDispatchToProps = dispatch => {
  return {
    catchPokemon: bindActionCreators(catchPokemon, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
