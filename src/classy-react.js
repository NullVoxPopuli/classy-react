import * as ReactStuff from "react";

export const useState = wrap(ReactStuff.useState);

const HOOKS = Symbol.for("__HONKS__");
const RULE_OF_HOOKS = Symbol.for("__RULEs_OF_HOOKS__");
const RULE_OF_HOOKS_CALLER = Symbol.for("__RULEs_OF_HOOKS_Caller__");

export function useHooks(klass) {
  class RuleOfHooks extends klass {
    // initializer to the tupel
    [HOOKS] = new WeakMap();
    [RULE_OF_HOOKS_CALLER] = () => {
      this[RULE_OF_HOOKS].forEach((x) => x());
    };
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
     * in function-components.
     */
    instance[RULE_OF_HOOKS].forEach((hookInit) => {
      let value = hookInit();
      instance[HOOKS].set(hookInit, value);
    });

    return instance.render();
  };
}

export function wrap(hook) {
  return function decorated(target, context) {
    const { get } = target;

    return {
      get() {
        let init = get.call(this);
        let tuple = this[HOOKS].get(init);
        return tuple[0];
      },
      set(value) {
        let init = get.call(this);
        let tuple = this[HOOKS].get(init);
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