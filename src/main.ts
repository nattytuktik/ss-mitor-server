import mongoose from 'mongoose';
import express, {
  Application,
  Express,
  NextFunction,
  Router,
  urlencoded,
} from 'express';
import dotenv from 'dotenv';
import { RouterMain } from './interface/routerMain';

dotenv.config();
const { MONGO_URI } = process.env;
const PORT = process.env.PORT || 5001;

export const main = (Routers: Array<RouterMain>, middlewares: Array<any>) => {
  const app = express();

  /**
   * GENARATE MIDDLEWARES RECURSIVE FUNCTION
   */
  getMiddlewares(app, middlewares);

  /*
   * GENARATE ROUTES WITH RECURSIVE Function
   */
  genRoutes(app, Routers);

  /**
   * CONNECT DATABASE
   */
  if (MONGO_URI === undefined) {
    console.log('mongodb URI is not defined');
  } else {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        app.listen(PORT, () =>
          console.log(`server run at http://localhost:${PORT}/`),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// RECURSIVE
const genRoutes = (
  app: Application,
  Routers: Array<RouterMain>,
): Application | undefined => {
  if (Routers.length === 0 || undefined) {
    return undefined;
  } else {
    const curRoute = Routers[0];
    app.use(curRoute.endpoint, curRoute.route);
    return genRoutes(app, Routers.slice(1, Routers.length));
  }
};

const getMiddlewares = (
  app: Application,
  middlewares: Array<any>,
): NextFunction | undefined => {
  if (middlewares.length === 0 || middlewares.length === undefined) {
    return undefined;
  } else {
    const curMiddleware = middlewares[0];
    app.use(curMiddleware);
    return getMiddlewares(app, middlewares.slice(1, middlewares.length));
  }
};
