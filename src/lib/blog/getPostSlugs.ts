import fs from "fs";
import { join } from "path";

export default function getPostSlugs() {
  const postsDirectory = join(process.cwd(), "src/content/blog");
  return fs.readdirSync(postsDirectory);
}
