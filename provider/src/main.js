import express from 'express';
import { Logger } from './logger';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import heroes from '../data/heroes.json';

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  return res.send({
    title: 'Hello! This is an example endpoint',
    message: 'You can edit this file to add real content. Take a look at <root>/src/main.js',
  });
})

app.get('/heroes', (req, res) => {
  return res.send({
    data: heroes.map(hero => ({
      id: hero.id,
      name: hero.localized_name,
      attack_type: hero.attack_type,
      roles: hero.roles,
    })) 
  });
})

app.listen(port, () => Logger.info(`Server running in port ${port}`));
