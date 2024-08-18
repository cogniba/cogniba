import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import GameTutorial from "./(components)/(tutorial)/GameTutorial";
import GameLogic from "./(components)/GameLogic";
import getSessionUser from "@/database/queries/users/getSessionUser";
import HighlightDialog from "@/components/HighlightDialog";

export default async function GamePage() {
  const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();
  const { hasFinishedTutorial, role } = await getSessionUser();

  // const level = 2;
  // const hasFinishedTutorial = false;
  // const role = "parent";

  return (
    <>
      {!hasFinishedTutorial ? (
        <GameTutorial startingLevel={level} showSkipButton={role !== "child"} />
      ) : (
        <GameLogic startingLevel={level} showFeedbackEnabled={showFeedback} />
      )}
    </>
  );
}
