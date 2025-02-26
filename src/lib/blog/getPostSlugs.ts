import blogConfig from "@/config/blogConfig";
import fs from "fs";

export default function getPostSlugs() {
  const { postsDirectory } = blogConfig;
  return fs.readdirSync(postsDirectory);
}
