# classy-react

- Want to use React, but tired of hooks?
- But at the same time, you super appreciate the ergonomics provided in _authoring_ hooks?
- Do you think that not being able to use hooks in classes is silly?

Now you can have the best both worlds, with classy-react! 

```jsx
import React from 'react';

import { useState, useHooks } from 'classy-react';

export default @useHooks class App {
  @useState accessor count = 5;

  render = () => {
    return (
      <>
        <button onClick={() => this.count += 1}>
            count is {this.count}
        </button>
      </>
    );
  }
}
```

## Install

```bash
pnpm add classy-react
```

## API

This library is experimental, and right now only provides three exports:

- `@useHooks` - allows vanilla classes to be used as components -- like with React's own class component, the `render` function is special in that it is used to hold the template of your component. 
- `@useState` - `React.useState`, but as a decorator
- `wrap` - utility for making turning your own hooks into decorators, as long as they return the tuple in the form of `[value, setter]` (like `useState` does)

## Notes
- Rules of hooks still apply (albeit now hidden~ish)
- You should never use `this.property = this.property.bind(this)` -- and React should have never recommended you do so.
- This library has no tests (for now)
