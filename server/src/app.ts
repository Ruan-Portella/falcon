import 'express-async-errors';
import express, { Response, Request, NextFunction } from 'express';
import appRouter from './routes/index';
import { HttpError } from './errors/error';
import cors from "cors";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());

    this.app.use(cors({origin: process.env.FRONTEND_URL || 'http://localhost'}));
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

export {App};

export const { app } = new App();
