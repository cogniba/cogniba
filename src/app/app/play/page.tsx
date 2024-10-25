import { SettingsType } from "@/database/schemas/settingsTable";
import GameTutorial from "./(components)/(tutorial)/GameTutorial";
import GameLogic from "./(components)/GameLogic";
import { UserType } from "@/database/schemas/profilesTable";

export default async function GamePage() {
  const getLevelPromise = fetch("/api/settings/get-level", {
    method: "GET",
  });
  const getSettingsPromise = fetch("/api/settings/get-settings", {
    method: "GET",
  });
  const getUserPromise = fetch("/api/user/get-user", { method: "GET" });

  const [levelResponse, settingsResponse, userResponse] = await Promise.all([
    getLevelPromise,
    getSettingsPromise,
    getUserPromise,
  ]);

  if (!levelResponse.ok) {
    <div>Error getting level</div>;
  } else if (!settingsResponse.ok) {
    <div>Error getting settings</div>;
  } else if (!userResponse.ok) {
    return <div>An error has ocurred</div>;
  }

  const levelPromise = levelResponse.json();
  const settingsPromise = settingsResponse.json();
  const userPromise = userResponse.json();

  const [levelData, settingsData, userData] = await Promise.all([
    levelPromise,
    settingsPromise,
    userPromise,
  ]);

  const level: number = levelData.level;
  const settings: SettingsType = settingsData.settings;
  const user: UserType = userData.user;

  return (
    <>
      {!user.hasFinishedTutorial ? (
        <GameTutorial startingLevel={level} />
      ) : (
        <GameLogic
          startingLevel={level}
          showFeedbackEnabled={settings.showFeedback}
        />
      )}
    </>
  );
}
