function FakeWebRepositoryBackend(repositoryClass) {
  this.repositoryClass = new repositoryClass().constructor.name
  this.entities = {}

  this.save = (entity) => {
    if(this.entities[this.repositoryClass] == undefined) {
      this.entities[this.repositoryClass] = []
    }
    this.entities[this.repositoryClass].push(entity)
    entity.id = this.entities[this.repositoryClass].length
    return new Promise((resolve) => resolve(entity))
  }

  this.find = (conditions) => {
    return new Promise((resolve) => resolve(this.entities[this.repositoryClass]))
  }
}

module.exports = FakeWebRepositoryBackend
