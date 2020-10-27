import * as github from '@actions/github'

export interface Options {
  title: string
  organization: string
  repository: string
  token: string
}

export async function upsertIssue(options: Options): Promise<void> {
  const octokit = github.getOctokit(options.token)
  await octokit.issues.create({
    owner: options.organization,
    repo: options.repository,
    title: options.title
  })
}
