import getGamesPlayedToday from "@/actions/game/getGamesPlayedToday";
import getLevel from "@/actions/game/getLevel";
import getMaxLevel from "@/actions/game/getMaxLevel";
import getProfile from "@/actions/getProfile";
import getSettings from "@/actions/getSettings";

export default async function fetchGameData(): Promise<{
  level?: number;
  maxLevel?: number;
  showFeedback?: boolean;
  hasFinishedTutorial?: boolean;
  gamesPlayedToday?: number;
  error?: string;
}> {
  const levelPromise = getLevel();
  const maxLevelPromise = getMaxLevel();
  const settingsPromise = getSettings();
  const profilePromise = getProfile();
  const gamesPlayedTodayPromise = getGamesPlayedToday();

  const [
    levelResult,
    maxLevelResult,
    settingsResult,
    profileResult,
    gamesResult,
  ] = await Promise.all([
    levelPromise,
    maxLevelPromise,
    settingsPromise,
    profilePromise,
    gamesPlayedTodayPromise,
  ]);

  if (
    levelResult.error ||
    maxLevelResult.error ||
    settingsResult.error ||
    profileResult.error ||
    gamesResult.error ||
    levelResult.data === undefined ||
    maxLevelResult.data === undefined ||
    !settingsResult.data ||
    !profileResult.data ||
    gamesResult.data === undefined
  ) {
    return { error: "Error getting game data" };
  }

  return {
    level: levelResult.data,
    maxLevel: maxLevelResult.data,
    showFeedback: settingsResult.data.showFeedback,
    hasFinishedTutorial: profileResult.data.hasFinishedTutorial,
    gamesPlayedToday: gamesResult.data,
  };
}
