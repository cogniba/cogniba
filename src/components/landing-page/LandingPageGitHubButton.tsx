import { Octokit } from "@octokit/core";
import { FaGithub } from "react-icons/fa6";

export default async function LandingPageGitHubButton() {
  const octokit = new Octokit();

  const res = await octokit.request("GET /repos/{org}/{repo}", {
    org: "Cogniba",
    repo: "Cogniba",
    type: "public",
  });

  const stars = res.data?.stargazers_count;

  return (
    <div className="flex items-center justify-center gap-2">
      <FaGithub className="text-lg" />
      <span>{stars}</span>
    </div>
  );
}
