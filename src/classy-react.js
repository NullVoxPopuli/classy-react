import * as ReactStuff from "react";

export const useState = wrap(ReactStuff.useState);

const HOOKS = Symbol.for("__HONKS__");
const RULE_OF_HOOKS = Symbol.for("__RULEs_OF_HONKS__");
const CURRENT_VALUES = Symbol.for("__CURRENT_VALUES__");

export function useHooks(klass) {
  class RuleOfHooks extends klass {
    // hook initializer => hook-return-value
    [HOOKS] = new WeakMap();
    // Because hooks-data is stale after a set (but before re-render)
    // we have to double up on the data storage so that this works:
    //
    // this.value #=> 1
    // this.value = 2
    // this.value #=> 2
    //
    // Without this storage, we'd have to wait for React to re-render
    // before we read the value again.
    [CURRENT_VALUES] = new WeakMap();
  }

  return function () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [instance] = ReactStuff.useState(() => new RuleOfHooks());
    /**
     * We need hooks to "re-run" every time a copmonent
     * renders, so we have to do this to trick react
     * in to thinking we aren't breaking the rules of hooks.
     *
     * This is bad for perf, but it's what folks do normally
     * in function-components anyway.
     */
    instance[RULE_OF_HOOKS].forEach((hookInit) => {
      let value = hookInit();
      instance[HOOKS].set(hookInit, value);
    });

    return instance.render();
  };
}

export function wrap(hook) {
  return function decorated(target /*, context */) {
    const { get } = target;

    return {
      get() {
        let init = get.call(this);
        let current = this[CURRENT_VALUES].get(init);

        /**
         * See note above about why this is needed.
         * (and why in idiomatic function-React, you have to use
         * useCallback.
         */
        if (current) {
          return current;
        }

        let tuple = this[HOOKS].get(init);
        return tuple[0];
      },
      set(value) {
        let init = get.call(this);
        let tuple = this[HOOKS].get(init);
        this[CURRENT_VALUES].set(init, value);
        return tuple[1](value);
      },
      init(initialValue) {
        let init = () => {
          return hook(initialValue);
        };

        this[RULE_OF_HOOKS] ||= [];
        this[RULE_OF_HOOKS].push(init);
        return init;
      },
    };
  };
}
