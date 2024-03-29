export function linearMap(val, domain, range) {
  const d0 = domain[0];
  const d1 = domain[1];
  const r0 = range[0];
  const r1 = range[1];

  const subDomain = d1 - d0;
  const subRange = r1 - r0;

  if (subDomain === 0) {
    return subRange === 0 ? r0 : (r0 + r1) / 2;
  }
  if (subDomain > 0) {
    if (val <= d0) {
      return r0;
    } else if (val >= d1) {
      return r1;
    }
  } else {
    if (val >= d0) {
      return r0;
    } else if (val <= d1) {
      return r1;
    }
  }

  return ((val - d0) / subDomain) * subRange + r0;
}
// https://dev.to/bwca/create-a-debounce-function-from-scratch-in-typescript-560m
export function debounce(fn, ms) {
  let timer;

  const debouncedFunc = (args) =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}
