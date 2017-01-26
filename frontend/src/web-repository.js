function WebRepository(repositoryClass, httpService) {
  this.save = (object) => {
    httpService.post()
  }
}


module.exports = WebRepository
