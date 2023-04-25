import { main } from './main';
import { RouterMain } from './interface/routerMain';
import { CustomerRouter } from './routers/customer';
import { MitorRouter } from './routers/mitor';
import { MitorRoomRouter } from './routers/mitorRoom';

import express, { urlencoded } from 'express';
import { SuwanRouter } from './routers/suwan';
import { AuthRouter } from './routers/auth';

const Routers: Array<RouterMain> = [
  {
    endpoint: '/customer',
    route: CustomerRouter,
  },
  {
    endpoint: '/mitor',
    route: MitorRouter,
  },

  {
    endpoint: '/mitor-room',
    route: MitorRoomRouter,
  },

  {
    endpoint: '/suwan',
    route: SuwanRouter,
  },

  {
    endpoint: '/auth',
    route: AuthRouter,
  },
];

const middlewares = [express.json(), urlencoded({ extended: false })];
main(Routers, middlewares);
