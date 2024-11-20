import express, { Express, Request, Response } from 'express';
import { GatewayServer } from '@gateway/server';
// import { redisConnection } from '@gateway/redis/redis.connection';

class Application {
  public initialize(): void {
    const app: Express = express();
    // Add a root route to handle requests to "/"
    app.get('/', (_req: Request, res: Response) => {
      res.send('Welcome to the API Gateway!');
    });

    // Handle requests for "/favicon.ico" to prevent errors
    app.get('/favicon.ico', (_req: Request, res: Response) => res.status(204).end());
    const server: GatewayServer = new GatewayServer(app);
    server.start();
    // redisConnection.redisConnect();
  }
}

const application: Application = new Application();
application.initialize();
