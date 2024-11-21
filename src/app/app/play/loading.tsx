export default function GameLoading() {
  return (
    <div className="flex h-screen animate-pulse items-center justify-center lg:can-hover:-ml-16">
      <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center px-[4cqw] opacity-80 [container-type:size] md:px-2">
        <div className="my-[1.5cqh] flex-shrink-0 sm:mb-[2.5cqh] sm:mt-[1.5cqh]">
          <div
            className="relative rounded-[0.75cqmin] border border-orange-300/50 bg-orange-200 px-[5cqmin] py-[1cqmin] text-[9cqmin] font-semibold shadow-sm dark:border-orange-800 dark:bg-orange-900 xs:text-[8cqmin] sm:text-[7cqmin] md:text-[6cqmin]"
            id="game-level-display"
          >
            <h1 className="text-transparent">Level 5</h1>
          </div>
        </div>
        <div className="h-[100cqmin] w-[100cqmin]">
          <div className="flex h-full w-full items-center justify-center [container-type:size]">
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
                    <div className="absolute h-[1cqmin] w-[5cqmin] rounded-full bg-orange-300 dark:bg-orange-600"></div>
                    <div className="absolute h-[1cqmin] w-[5cqmin] rotate-90 rounded-full bg-orange-300 dark:bg-orange-600"></div>
                  </div>
                ) : (
                  <div key={i} className="h-full w-full">
                    <div className="h-full w-full rounded-[2cqmin] border border-teal-400/50 bg-teal-300 shadow-sm transition duration-100 dark:border-teal-400 dark:bg-teal-500"></div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="mb-[2.5cqh] mt-[3cqh] h-[11cqh] w-[100cqmin] max-w-5xl flex-shrink-0 2xl:w-[max(100cqmin,90vh)]">
          <div
            className="flex h-full w-full items-center justify-center"
            id="game-button"
          >
            <div className="h-full w-full -translate-y-0.5 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 will-change-transform dark:border-orange-700 dark:bg-orange-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
