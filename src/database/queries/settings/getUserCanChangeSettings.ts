import getUser from "../users/getUser";
import getSettingsByUserId from "./getSettingsByUserId";

export default async function getUserCanChangeSettings(): Promise<boolean> {
  const { parentId } = await getUser();

  if (!parentId) {
    return true;
  }

  const settings = await getSettingsByUserId(parentId);

  return settings?.canChildrenChangeSettings ?? true;
}
