"use server";

import updateUserHasFinishedTutorial from "@/database/queries/users/updateUserHasFinishedTutorial";
import { revalidatePath } from "next/cache";

export default async function finishTutorial(): Promise<void> {
  await updateUserHasFinishedTutorial(true);
  revalidatePath("/app/play");
}
