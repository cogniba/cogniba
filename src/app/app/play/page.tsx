import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import PlayTutorial from "./(components)/(tutorial)/PlayTutorial";
import GameLogic from "./(components)/GameLogic";

export default async function PlayPage() {
  const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();
  const tutorialPart = null;

  return (
    <>
      {tutorialPart !== null ? (
        <PlayTutorial />
      ) : (
        <GameLogic startingLevel={level} showFeedbackEnabled={showFeedback} />
      )}
    </>
  );
}
