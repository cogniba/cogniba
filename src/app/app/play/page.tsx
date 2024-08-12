import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import PlayTutorial from "./(components)/(tutorial)/PlayTutorial";
import GameLogic from "./(components)/GameLogic";
import getSessionUser from "@/database/queries/users/getSessionUser";

export default async function PlayPage() {
  // const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();
  // const { hasFinishedTutorial } = await getSessionUser();
  const level = 1;
  const hasFinishedTutorial = false;

  return (
    <>
      {!hasFinishedTutorial ? (
        <PlayTutorial startingLevel={level} />
      ) : (
        <GameLogic startingLevel={level} showFeedbackEnabled={showFeedback} />
      )}
    </>
  );
}
