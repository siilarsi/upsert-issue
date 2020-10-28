import * as core from '@actions/core'
import * as issue from './issue'

async function run(): Promise<void> {
  try {
    const fullRepositoryPath: string = core.getInput('repository')
    const options: issue.Options = {
      title: core.getInput('text'),
      token: core.getInput('token'),
      owner: fullRepositoryPath.split('/')[0],
      repo: fullRepositoryPath.split('/')[1]
    }
    issue.create(options)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
