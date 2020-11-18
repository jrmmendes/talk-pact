import express from 'express';
import { Logger } from './logger';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import heroes from '../data/heroes.json';

const port = process.env.PORT || 3001;

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
});

app.get('/heroes/:id', (req, res) => {
  if (req.params.id < 0) {
    return res.status(404).send({ error: 'ID must be a positive integer' });
  }
  const hero = heroes.find(hero => String(hero.id) === req.params.id)

  if (!hero) {
    return res.status(404).send({ message: `Hero with ID ${req.params.id} not found` });
  }

  return res.send(hero);
})

app.listen(port, () => Logger.info(`Server running in port ${port}`));
