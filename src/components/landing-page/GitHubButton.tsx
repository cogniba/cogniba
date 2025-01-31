import { Octokit } from "@octokit/core";
import { FaGithub } from "react-icons/fa6";

export default async function GitHubButton() {
  const octokit = new Octokit();
  let hasFetched;
  let stars;

  try {
    const res = await octokit.request("GET /repos/{org}/{repo}", {
      org: "cogniba",
      repo: "cogniba",
      type: "public",
    });

    stars = res.data?.stargazers_count;
    hasFetched = true;
  } catch {
    hasFetched = false;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <FaGithub className="text-lg" />
      {stars && <span>{hasFetched ? stars : "?"}</span>}
    </div>
  );
}
