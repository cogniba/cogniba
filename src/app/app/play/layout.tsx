import GameContextProvider from "@/context/GameContext";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return <GameContextProvider>{children}</GameContextProvider>;
}
