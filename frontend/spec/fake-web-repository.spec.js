var expect = require('expect.js')
var FakeWebRepository = require('./fake-web-repository-backend')

var webRepositoryTests = require('./web-repository.contract')


describe('FakeWebRepository', function() {
  webRepositoryTests(FakeWebRepository)
})
