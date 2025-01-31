import { SettingsType } from "@/database/schemas/settingsTable";
import GameTutorial from "@/components/game/tutorial/GameTutorial";
import GameLogic from "@/components/game/GameLogic";
import { ProfileType } from "@/database/schemas/profilesTable";
import getLevelRequest from "@/lib/server/game/getLevelRequest";
import getMaxLevelRequest from "@/lib/server/game/getMaxLevelRequest";
import getSettingsRequest from "@/lib/server/settings/getSettingsRequest";
import getUserRequest from "@/lib/server/auth/getUserRequest";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";

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
    return (
      <SimpleMessageScreen
        mainMessage="Error getting level"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
  } else if (!maxLevelResponse.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting max level"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
  } else if (!settingsResponse.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting settings"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
  } else if (!userResponse.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting user"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
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
  const profile: ProfileType = userData.user;

  return (
    <>
      {!profile.hasFinishedTutorial ? (
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
