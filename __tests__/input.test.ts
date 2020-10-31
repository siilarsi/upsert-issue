import * as input from '../src/input'

test('converting complete creation input to issue options', async () => {
  let coreInput = new CoreInputBuilder()
    .set('title', 'some-title')
    .set('body', 'some-body')
    .set('repository', 'some-owner/some-repo')

  const options = input.toIssueOptions(coreInput.get())

  expect(options).toStrictEqual({
    owner: 'some-owner',
    repo: 'some-repo',
    token: 'some-token',
    title: 'some-title',
    body: 'some-body'
  })
})

test('repository input with only one path variable should throw', async () => {
  const expected = '"repository": "some-owner" must have format "owner/repo"'
  let coreInput = new CoreInputBuilder()
    .set('repository', 'some-owner')

  expect(() => { input.toIssueOptions(coreInput.get()) }).toThrow(expected)
})

test('repository input with too many path variables should throw', async () => {
  const expected = '"repository": "some-owner/some-owner/some-repo" must have format "owner/repo"'
  let coreInput = new CoreInputBuilder()
    .set('repository', 'some-owner/some-owner/some-repo')

  expect(() => { input.toIssueOptions(coreInput.get()) }).toThrow(expected)
})

test('repository input without owner should throw', async () => {
  const expected = '"repository": "/some-repo" must have format "owner/repo"'
  let coreInput = new CoreInputBuilder()
    .set('repository', '/some-repo')

  expect(() => { input.toIssueOptions(coreInput.get()) }).toThrow(expected)
})

test('repository input without repo should throw', async () => {
  const expected = '"repository": "some-owner/" must have format "owner/repo"'
  let coreInput = new CoreInputBuilder()
    .set('repository', 'some-owner/')

  expect(() => { input.toIssueOptions(coreInput.get()) }).toThrow(expected)
})

class CoreInputBuilder {
  coreInput: Map<string, string> = new Map<string, string>()
  constructor() {
    this.coreInput.set('token', 'some-token')
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
