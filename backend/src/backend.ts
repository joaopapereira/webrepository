import pluralize = require('pluralize');
export interface Response {
  send(text: any): Response;
  status(status: number): Response;
}

export interface Request {
  method: string;
  url: string;
}

interface Backend {
  post(request: Request, response: Response, next);
  get(request: Request, response: Response, next);
  middleware(request: Request, response: Response, next);
}

export default class WebRepositoryBackend implements Backend {

  static entityManager: any;

  post(request: Request, response: Response, next) {
    if(request.method == 'POST') {
      console.log('it was a post')
    }
    console.log("post");
    response.send({bamm: "post"});
  }

  get(request: Request, response: Response, next) {
    let links = [];
    if(request.url == '/') {
      WebRepositoryBackend.entityManager.entities.forEach((entityClass) => {
        links.push('http://localhost:3000/' + this.nameOfClass(entityClass));
      });
    } else {
      if(request.url == '/tests') {
        
      }
    }
    response.send({_links: links});
  }

  middleware(request: Request, response: Response, next) {
    if(request.method == 'POST') {
      new WebRepositoryBackend().post(request, response, next);
      return;
    } else if(request.method == 'GET') {
      new WebRepositoryBackend().get(request, response, next);
      return;
    }
    next();
  }

  nameOfClass(entityClass: any) {
    return this.firstToLowerCase(pluralize.plural(new entityClass().constructor.name));
  }

  firstToLowerCase( str ) {
      return str.substr(0, 1).toLowerCase() + str.substr(1);
  }
}
