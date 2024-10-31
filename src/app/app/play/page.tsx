import { SettingsType } from "@/database/schemas/settingsTable";
import GameTutorial from "@/components/game/tutorial/GameTutorial";
import GameLogic from "@/components/game/GameLogic";
import { UserType } from "@/database/schemas/profilesTable";
import getLevelRequest from "@/lib/server/game/getLevelRequest";
import getMaxLevelRequest from "@/lib/server/game/getMaxLevelRequest";
import getSettingsRequest from "@/lib/server/settings/getSettingsRequest";
import getUserRequest from "@/lib/server/auth/getUserRequest";

export const dynamic = "force-dynamic";

export default async function GamePage() {
  const getLevelPromise = getLevelRequest();
  const getMaxLevelPromise = getMaxLevelRequest();
  const getSettingsPromise = getSettingsRequest();
  const getUserPromise = getUserRequest();

  const [levelResponse, maxLevelResponse, settingsResponse, userResponse] =
    await Promise.all([
      getLevelPromise,
      getMaxLevelPromise,
      getSettingsPromise,
      getUserPromise,
    ]);

  if (!levelResponse.ok) {
    return <div>Error getting level</div>;
  } else if (!maxLevelResponse.ok) {
    return <div>Error getting max level</div>;
  } else if (!settingsResponse.ok) {
    return <div>Error getting settings</div>;
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

  console.log(settingsData);

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
