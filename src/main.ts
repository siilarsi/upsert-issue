import * as core from '@actions/core'
import * as issue from './issue'
import * as input from './input'

async function run(): Promise<void> {
  try {
    const options: issue.Options = input.toIssueOptions(core.getInput)
    issue.create(options)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
