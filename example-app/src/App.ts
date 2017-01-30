import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import WebRepositoryBackend from 'web-repository-backend';

import { Entity } from 'typeorm';

@Entity("test_table")
class Test{
  constructor() {

  }
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public webRepository: WebRepositoryBackend;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.webRepository = new WebRepositoryBackend();
    WebRepositoryBackend.entityManager = {entities: [Test]};
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();


    router.use(this.webRepository.middleware)
    // placeholder route handler

    // router.get('*', new WebRepositoryBackend().get);
    // router.post('*', new WebRepositoryBackend().post);

    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    this.express.use('/', router);
  }

}

export default new App().express;
