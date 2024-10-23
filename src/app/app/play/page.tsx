import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import GameTutorial from "./(components)/(tutorial)/GameTutorial";
import GameLogic from "./(components)/GameLogic";
import { UserType } from "@/database/schemas/profiles";

export default async function GamePage() {
  const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();

  const response = await fetch("/api/user/get_user", { cache: "no-cache" });
  if (!response.ok) {
    return <div>An error has ocurred</div>;
  }

  const user: UserType = await response.json();

  return (
    <>
      {!user.hasFinishedTutorial ? (
        <GameTutorial startingLevel={level} />
      ) : (
        <GameLogic startingLevel={level} showFeedbackEnabled={showFeedback} />
      )}
    </>
  );
}
