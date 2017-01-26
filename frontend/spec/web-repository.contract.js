var expect = require('expect.js')
var WebRepository = require('./fake-web-repository-backend')

function NewEntity() {
  this.id = undefined;
}

function webRepositoryTests(className) {
  let repository;
  let entity;
  
  beforeEach(() => {
    repository = new className(NewEntity);
  })

  describe('create a new object', function() {
    it('success', function(done) {
      entity = new NewEntity()
      repository.save(entity).then((savedEntity) => {
        expect(savedEntity.id).to.be(1)
        repository.find().then((allEntities) => {
          expect(allEntities.length).to.be(1)
          done()
        })
      })
    })
  })
}

module.exports = webRepositoryTests
