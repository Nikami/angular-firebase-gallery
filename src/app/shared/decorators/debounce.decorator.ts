const DEFAULT_DEBOUNCE_MS = 500;

export function Debounce(ms: number = DEFAULT_DEBOUNCE_MS): Function {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): any {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function(): () => any {
        Object.defineProperty(this, propertyKey, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: _debounce(descriptor.value, ms)
        });

        return this[propertyKey];
      }
    };
  };
}

function _debounce(func: Function, ms: number): Function {
  let timeoutId: any;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function() {
      func.apply(context, args);
    }, ms);
  };
}
