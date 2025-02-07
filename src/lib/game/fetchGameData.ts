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
    { level, error: levelError },
    { maxLevel, error: maxLevelError },
    { settings, error: settingsError },
    { profile, error: profileError },
    { gamesPlayedToday, error: gamesPlayedTodayError },
  ] = await Promise.all([
    levelPromise,
    maxLevelPromise,
    settingsPromise,
    profilePromise,
    gamesPlayedTodayPromise,
  ]);

  if (
    levelError ||
    maxLevelError ||
    settingsError ||
    profileError ||
    gamesPlayedTodayError ||
    !level ||
    !maxLevel ||
    !settings ||
    !profile ||
    gamesPlayedToday === undefined
  ) {
    return { error: "Error getting game data" };
  }

  return {
    level,
    maxLevel,
    showFeedback: settings.showFeedback,
    hasFinishedTutorial: profile.hasFinishedTutorial,
    gamesPlayedToday,
  };
}
