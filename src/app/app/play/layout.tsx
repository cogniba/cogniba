import GameContextProvider from "@/context/GameContext";
import GameTutorialContextProvider from "@/context/GameTutorialContext";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <GameContextProvider>
      <GameTutorialContextProvider>{children}</GameTutorialContextProvider>
    </GameContextProvider>
  );
}
