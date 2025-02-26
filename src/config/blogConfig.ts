import path from "path";

const blogConfig = {
  postsPerPage: 6,
  postsDirectory: path.join(process.cwd(), "src", "content", "blog"),
};

export default blogConfig;
