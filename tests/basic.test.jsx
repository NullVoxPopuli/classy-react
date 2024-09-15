import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useState, useHooks } from '../src/classy-react.js';

describe('is Glitch Free (a non-standard behavior for React)', () => {
  it('incrementer works', async () => {
    @useHooks class Counter {
      @useState accessor count = 0;

      render = () => {
        return (
          <>
            <button onClick={() => this.count += 1}>{this.count}</button>
          </>
        );
      }
    }

    render(<Counter />)

    let button = screen.getByRole('button');

    expect(button.innerHTML).toEqual('0');
    await userEvent.click(button)
    expect(button.innerHTML).toEqual('1');

  })

  it('with a bound function', async () => {
    @useHooks class Counter {
      @useState accessor count = 0;

      inc = () => this.count++;

      render = () => {
        return (
          <>
            <output>{this.count}</output>
            <button onClick={this.inc}>{this.count}</button>
          </>
        );
      }
    }

    render(<Counter />)

    let button = screen.getByRole('button');

    expect(button.innerHTML).toEqual('0');
    await userEvent.click(button)
    expect(button.innerHTML).toEqual('1');
  })

  it('accessing count and setting it makes sense', async () => {
    let expectations = [];
    @useHooks class Counter {
      @useState accessor count = 0;

      inc = () => {
        expectations.push(this.count);
        this.count++;
        expectations.push(this.count);
      }

      render = () => {
        return (
          <>
            <output>{this.count}</output>
            <button onClick={this.inc}>{this.count}</button>
          </>
        );
      }
    }

    render(<Counter />)

    let button = screen.getByRole('button');

    expect(button.innerHTML).toEqual('0');
    await userEvent.click(button)
    expect(button.innerHTML).toEqual('1');

    expect(expectations).to.deep.equal([0, 1]);
  })
})
