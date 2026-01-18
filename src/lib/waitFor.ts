export default function waitFor(
  conditionFunction: () => boolean,
  interval = 10,
) {
  const poll = (resolve: (value: void | PromiseLike<void>) => void) => {
    if (conditionFunction()) {
      resolve();
    } else {
      setTimeout(() => { poll(resolve); }, interval);
    }
  };

  return new Promise<void>(poll);
}
