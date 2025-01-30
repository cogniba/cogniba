export default function waitFor(
  conditionFunction: () => boolean,
  interval = 10,
) {
  // TODO
  const poll = (resolve: any) => {
    if (conditionFunction()) {
      resolve();
    } else {
      setTimeout(() => poll(resolve), interval);
    }
  };

  return new Promise(poll);
}
