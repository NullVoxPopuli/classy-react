import React from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { useState, useHooks } from './classy-react';

export default @useHooks class App {
  @useState accessor id = 0;
  @useState accessor json = {};

  requestCharacter = async (id) => {
    let response = await fetch(`https://swapi.dev/api/people/${id}`);
    let json = await response.json();

    return json;
  }

  handleClick = async () => {
    this.json = await this.requestCharacter(this.id += 1);
  }

  render = () => {
    return (
      <>
        <div className="centered">
          <div>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Classy React</h1>
          <div className="card">
            <button onClick={this.handleClick}>Get Next Character</button>
          </div>
        </div>
        {this.json.name &&
          <div>
            {this.json.name}
            <pre>{JSON.stringify(this.json, null, 2)}</pre>
          </div>
        }
      </>
    );
  }
}
