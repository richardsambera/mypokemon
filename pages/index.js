import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout/index";
import "./style.sass";
import Router from "next/router";

class Index extends React.Component {
  render() {
    return (
      <>
        <Layout isTransparent>
          <div className="fullscreen columns is-mobile is-vcentered">
            <div className="container">
              <div className="title is-1" align="center">
                Welcome to Pokemon World
              </div>
              <div className="subtitle is-2" align="center">
                Explore World with all Pokemon!
              </div>
              <div align="center">
                <div
                  onClick={() => {
                    Router.push("/mypokemon");
                  }}
                >
                  <button className="button is-large is-black is-outlined">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = ({ name }) => ({ name });

export default connect(mapStateToProps, null)(Index);
