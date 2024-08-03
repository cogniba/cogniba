import Game from "@/app/app/play/(components)/Game";
import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";

export default async function PlayPage() {
  const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();

  return <Game startingLevel={level} showFeedbackEnabled={showFeedback} />;
}
