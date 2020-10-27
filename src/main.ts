import * as core from '@actions/core'
import {upsertIssue} from './issue'

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository')
    const text: string = core.getInput('text')
    const token: string = core.getInput('token')
    const orgName: string = repository.split('/')[0]
    const repoName: string = repository.split('/')[1]
    upsertIssue({
      repository: repoName,
      organization: orgName,
      token,
      title: text
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
