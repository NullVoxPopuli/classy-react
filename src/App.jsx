import React from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { useState, useHooks } from './classy-react';

export default @useHooks class App {
  @useState accessor count = 5;

  render = () => {
    return (
      <>
        <div>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Classy React</h1>
        <div className="card">
          <button onClick={() => this.count += 10}>count is {this.count}</button>
        </div>
      </>
    );
  }
}
