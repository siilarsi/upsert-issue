import {upsertIssue, Options} from '../src/issue'
import nock from 'nock'

describe('When the action is triggered', () => {
  let issueOptions: Options = {
    title: '',
    organization: '',
    repository: '',
    token: ''
  }

  beforeEach(() => {
    nock.disableNetConnect()
    nock.abortPendingRequests()
    issueOptions.token = 'abc123'
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('with a valid repository and organization', () => {
    beforeEach(() => {
      issueOptions.organization = 'organization'
      issueOptions.repository = 'repository'
    })

    describe('and with a title of a single line', () => {
      beforeEach(() => {
        issueOptions.title = 'title with a single line'
      })

      it('should create the issue in the provided repository with the given text as a title', async () => {
        let actualRequestBody = {}
        let requests = nock('https://api.github.com')
          .post(`/repos/organization/repository/issues`, (requestBody: any) => {
            actualRequestBody = requestBody
            return true
          })
          .reply(200)

        await upsertIssue(issueOptions)

        expect(requests.pendingMocks()).toStrictEqual([])
        expect(actualRequestBody).toStrictEqual({
          title: 'title with a single line'
        })
      })
    })
  })
})
