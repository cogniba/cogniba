import getLevel from "@/actions/game/getLevel";
import getMaxLevel from "@/actions/game/getMaxLevel";
import getProfile from "@/actions/getProfile";
import getSettings from "@/actions/getSettings";

export default async function fetchGameData(): Promise<{
  level?: number;
  maxLevel?: number;
  showFeedback?: boolean;
  hasFinishedTutorial?: boolean;
  error?: string;
}> {
  const levelPromise = getLevel();
  const maxLevelPromise = getMaxLevel();
  const settingsPromise = getSettings();
  const profilePromise = getProfile();

  const [
    { level, error: levelError },
    { maxLevel, error: maxLevelError },
    { settings, error: settingsError },
    { profile, error: profileError },
  ] = await Promise.all([
    levelPromise,
    maxLevelPromise,
    settingsPromise,
    profilePromise,
  ]);

  if (
    levelError ||
    maxLevelError ||
    settingsError ||
    profileError ||
    !level ||
    !maxLevel ||
    !settings ||
    !profile
  ) {
    return { error: "Error getting game data" };
  }

  return {
    level,
    maxLevel,
    showFeedback: settings.showFeedback,
    hasFinishedTutorial: profile.hasFinishedTutorial,
  };
}
