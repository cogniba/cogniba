import { Octokit } from "@octokit/core";
import { FaGithub } from "react-icons/fa6";

type RepoResponse = {
  stargazers_count: number | null;
};

export default async function GitHubButton() {
  const octokit = new Octokit();
  let hasFetched = false;
  let stars: number | null = null;

  try {
    const res = await octokit.request("GET /repos/{org}/{repo}", {
      org: "cogniba",
      repo: "cogniba",
      type: "public",
    });

    const repoData = res.data as RepoResponse;
    stars = repoData.stargazers_count;
    hasFetched = true;
  } catch {
    hasFetched = false;
  }

  const starLabel = stars === null ? "?" : String(stars);

  return (
    <div className="flex items-center justify-center gap-2">
      <FaGithub className="text-lg" />
      <span>{hasFetched ? starLabel : "?"}</span>
    </div>
  );
}
