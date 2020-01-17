import { connect } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";
import "./layout.sass";

class Layout extends React.Component {
  state = {
    isActive: false
  };

  render() {
    const { children, isTransparent, name } = this.props;

    const { isActive } = this.state;
    const navbarClass = isTransparent ? "navbar is-warning" : "navbar is-light";

    return (
      <>
        <nav
          className={navbarClass}
          role="navigation"
          aria-label="main navigation"
        >
            <div className="navbar-brand">
              <a
                role="button"
                className={`navbar-burger burger ${
                  isActive ? "is-active" : ""
                }`}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={() => {
                  this.setState({
                    isActive: !isActive
                  });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div
              id="navbarBasicExample"
              className={`navbar-menu ${isActive ? "is-active" : ""}`}
            >
              <div className="navbar-start">
                <a
                  onClick={() => {
                    Router.push("/");
                  }}
                  className="navbar-item has-text-weight-semibold"
                >
                  Home
                </a>
                <a
                  onClick={() => {
                    Router.push("/mypokemon");
                  }}
                  className="navbar-item has-text-weight-semibold"
                >
                  My Pokemon
                </a>
                <a
                  onClick={() => {
                    Router.push("/list");
                  }}
                  className="navbar-item has-text-weight-semibold"
                >
                  Pokemon List
                </a>
              </div>
              <div className="navbar-end">
                <div className="navbar-item has-text-weight-semibold">
                  Hi, {name}
                </div>
              </div>
            </div>
        </nav>
        <div className="layout-children">{children}</div>
        <footer></footer>
      </>
    );
  }
}

Layout.propTypes = {
  isTransparent: PropTypes.bool,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.element
  ]).isRequired
};

Layout.defaultProps = {
  isTransparent: false
};

const mapStateToProps = ({ name }) => ({ name });

export default connect(mapStateToProps, null)(Layout);
