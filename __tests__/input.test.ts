import * as input from '../src/input'

test('converting to request header variables', async () => {
  let coreInput = new CoreInputBuilder()

  let header = input.toIssueOptions(coreInput.get())

  expect(header).toStrictEqual({
    owner: 'some-owner',
    repo: 'some-repo',
    token: 'some-token',
    title: 'some-title',
    body: 'some-body'
  })
})

class CoreInputBuilder {
  coreInput: Map<string, string> = new Map<string, string>()
  constructor() {
    this.coreInput.set('title', 'some-title')
    this.coreInput.set('body', 'some-body')
    this.coreInput.set('token', 'some-token')
    this.coreInput.set('repository', 'some-owner/some-repo')
  }

  set(key: string, value: string) {
    this.coreInput.set(key, value)
    return this
  }

  get() {
    return (key: string) => {
      return this.coreInput.get(key)!
    }
  }
}
