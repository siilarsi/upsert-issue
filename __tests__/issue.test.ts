import * as issue from '../src/issue'
import nock from 'nock'

describe('When creating a issue', () => {
  let issueOptions: any = {}

  beforeEach(() => {
    nock.disableNetConnect()
    nock.abortPendingRequests()
    issueOptions.token = 'abc123'
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('with a repository and owner', () => {
    beforeEach(() => {
      issueOptions.owner = 'some-organization'
      issueOptions.repo = 'some-repository'
    })

    describe('and with a title', () => {
      beforeEach(() => {
        issueOptions.title = 'some title'
      })

      it('should be created with the title and no body', async () => {
        let actualRequestBody = {}
        let requests = nock('https://api.github.com')
          .post(
            `/repos/some-organization/some-repository/issues`,
            (requestBody: any) => {
              actualRequestBody = requestBody
              return true
            }
          )
          .reply(200)

        await issue.create(issueOptions)

        expect(requests.pendingMocks()).toStrictEqual([])
        expect(actualRequestBody).toStrictEqual({
          title: issueOptions.title
        })
      })

      describe('and a body', () => {
        beforeEach(() => {
          issueOptions.body = 'some body'
        })

        it('should be created with the title and body', async () => {
          let actualRequestBody = {}
          let requests = nock('https://api.github.com')
            .post(
              `/repos/some-organization/some-repository/issues`,
              (requestBody: any) => {
                actualRequestBody = requestBody
                return true
              }
            )
            .reply(200)

          await issue.create(issueOptions)

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
