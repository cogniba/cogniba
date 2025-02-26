import { join } from "path";

const blogConfig = {
  postsDirectory: join(process.cwd(), "src/content/blog"),
} as const;

export default blogConfig;
