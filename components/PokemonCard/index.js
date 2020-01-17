import "./card.sass";
import Router from "next/router";
import { getPokemonImageURL } from "../../helper/http";
import PropTypes from "prop-types";

class PokemonCard extends React.Component {
  render() {
    const { pokemonID, name, children } = this.props;

    return (
      <>
        <div className="pokemon-card" align="center">
          <div className="pokemon-img">
            <img src={getPokemonImageURL(pokemonID)} alt={name} />
          </div>
          <div className="title is-5 is-capitalized">{name}</div>
          {children}
        </div>
      </>
    );
  }
}

PokemonCard.propTypes = {
  pokemonID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.element
  ]).isRequired
};

export default PokemonCard;
