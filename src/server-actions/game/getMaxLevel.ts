"use server";

import getUserMaxLevel from "@/database/queries/games/getUserMaxLevel";

export default async function getMaxLevel() {
  return await getUserMaxLevel();
}
