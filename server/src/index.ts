import 'express-async-errors';
import express, { Response, Request, NextFunction } from 'express';
import appRouter from './routes';
import { HttpError } from './errors/error';

const port = process.env.PORT_BACKEND || 8080;
class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(appRouter);

    this.app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
      if (err instanceof HttpError) {
        res.status(err.status).json(err.error);
      } else {
        res.status(500).json({
          error_description: 'Internal server error',
          error_code: 'INTERNAL_SERVER_ERROR',
        });
      }
      next();
    })
  }

  public start(port: number | string): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

new App().start(port);
