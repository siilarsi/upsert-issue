import {upsertIssue} from '../src/issue'
import {Options} from '../src/input'
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

    describe('and with a title with no special characters', () => {
      beforeEach(() => {
        issueOptions.title = 'a simple title'
      })

      it('should create the issue in the provided repository with the provided title and no body', async () => {
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
          title: issueOptions.title
        })
      })

      describe('and a body', () => {
        beforeEach(() => {
          issueOptions.body = 'a small body'
        })

        it('should create the issue in the provided repository with the given text and body', async () => {
          let actualRequestBody = {}
          let requests = nock('https://api.github.com')
            .post(
              `/repos/organization/repository/issues`,
              (requestBody: any) => {
                actualRequestBody = requestBody
                return true
              }
            )
            .reply(200)

          await upsertIssue(issueOptions)

          expect(requests.pendingMocks()).toStrictEqual([])
          expect(actualRequestBody).toStrictEqual({
            title: issueOptions.title,
            body: issueOptions.body
          })
        })
      })
    })
  })
})
