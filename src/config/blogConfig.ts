import path from "path";

const blogConfig = {
  postsPerPage: 6,
  postsDirectory: path.join(process.cwd(), "src", "content", "blog"),
  defaultAuthor: "Cogniba Team",
  defaultRole: "",
  defaultImage: "/images/blog/cogniba-launch.png",
  defaultOgImage: "/images/blog/cogniba-launch.png",
};

export default blogConfig;
