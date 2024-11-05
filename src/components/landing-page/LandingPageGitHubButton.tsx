import { App } from "octokit";

export default async function LandingPageGitHubButton() {
  const app = new App({
    appId: process.env.APP_ID!,
    privateKey: process.env.PRIVATE_KEY!,
  });

  const octokit = await app.getInstallationOctokit(
    Number(process.env.INSTALLATION_ID!),
  );

  octokit.rest.repos.get({
    owner: "Cogniba",
    repo: "Cogniba",
  });
}
