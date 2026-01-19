export default function GameLoading() {
  return (
    <div className="lg:can-hover:-ml-16 flex h-full animate-pulse items-center justify-center">
      <div className="[container-type:size] flex h-full w-full max-w-3xl flex-col items-center justify-center px-[4cqw] md:px-2">
        <div className="my-[1.5cqh] flex-shrink-0 sm:mt-[1.5cqh] sm:mb-[2.5cqh]">
          <div
            className="bg-secondary/30 xs:text-[8cqmin] relative rounded-[0.75cqmin] border px-[5cqmin] py-[1cqmin] text-[9cqmin] font-semibold shadow-sm sm:text-[7cqmin] md:text-[6cqmin]"
            id="game-level-display"
          >
            <h1 className="text-transparent">Level 5</h1>
          </div>
        </div>
        <div className="h-[100cqmin] w-[100cqmin]">
          <div className="[container-type:size] flex h-full w-full items-center justify-center">
            <div
              className="grid h-[100cqmin] w-[100cqmin] grid-cols-3 grid-rows-3 gap-[2cqmin]"
              id="game-board"
            >
              {Array.from({ length: 9 }, (_, i) =>
                i === 4 ? (
                  <div
                    key={i}
                    className="relative flex h-full w-full items-center justify-center"
                  >
                    <div className="bg-overlay-secondary/50 absolute h-[1cqmin] w-[5cqmin] rounded-full"></div>
                    <div className="bg-overlay-secondary/50 absolute h-[1cqmin] w-[5cqmin] rotate-90 rounded-full"></div>
                  </div>
                ) : (
                  <div key={i} className="h-full w-full">
                    <div className="bg-secondary/50 h-full w-full rounded-[2cqmin] border"></div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="mt-[3cqh] mb-[2.5cqh] h-[11cqh] w-[100cqmin] max-w-5xl flex-shrink-0 2xl:w-[max(100cqmin,90vh)]">
          <div
            className="flex h-full w-full items-center justify-center"
            id="game-button"
          >
            <div className="bg-secondary/40 h-full w-full -translate-y-0.5 rounded-md border outline-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
