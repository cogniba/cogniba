import { SettingsType } from "@/database/schemas/settingsTable";
import GameTutorial from "./(components)/(tutorial)/GameTutorial";
import GameLogic from "./(components)/GameLogic";
import { UserType } from "@/database/schemas/profilesTable";
import getLevel from "@/lib/server/game/getLevel";
import getMaxLevel from "@/lib/server/game/getMaxLevel";
import getSettings from "@/lib/server/settings/getSettings";
import getUser from "@/lib/server/game/getUser";

export default async function GamePage() {
  const getLevelPromise = getLevel();
  const getMaxLevelPromise = getMaxLevel();
  const getSettingsPromise = getSettings();
  const getUserPromise = getUser();

  const [levelResponse, maxLevelResponse, settingsResponse, userResponse] =
    await Promise.all([
      getLevelPromise,
      getMaxLevelPromise,
      getSettingsPromise,
      getUserPromise,
    ]);

  if (!levelResponse.ok) {
    <div>Error getting level</div>;
  } else if (!maxLevelResponse.ok) {
    <div>Error getting max level</div>;
  } else if (!settingsResponse.ok) {
    <div>Error getting settings</div>;
  } else if (!userResponse.ok) {
    return <div>An error has ocurred</div>;
  }

  const levelPromise = levelResponse.json();
  const maxLevelPromise = maxLevelResponse.json();
  const settingsPromise = settingsResponse.json();
  const userPromise = userResponse.json();

  const [levelData, maxLevelData, settingsData, userData] = await Promise.all([
    levelPromise,
    maxLevelPromise,
    settingsPromise,
    userPromise,
  ]);

  const level: number = levelData.level;
  const maxLevel: number = maxLevelData.maxLevel;
  const settings: SettingsType = settingsData.settings;
  const user: UserType = userData.user;

  return (
    <>
      {!user.hasFinishedTutorial ? (
        <GameTutorial startingLevel={level} startingMaxLevel={maxLevel} />
      ) : (
        <GameLogic
          startingLevel={level}
          startingMaxLevel={maxLevel}
          showFeedbackEnabled={settings.showFeedback}
        />
      )}
    </>
  );
}
