import 'reflect-metadata';
import express from 'express';
import './database/connect';
import routes from './routes';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(8085, () => console.log('😀 Server started on port 8085'));