import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { Logger } from './logger';
import { getHeroDetails, getHeroesList } from './api';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', async (req, res) => {
  const heroes = await getHeroesList();
  const phantonAssassin = await getHeroDetails(44);

  return res.send({ heroes, phantonAssassin });
});

export const consumer = app;
