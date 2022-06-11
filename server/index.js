import express from 'express';
import cors from 'cors';
import ItemsRouter from './routes/items';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', ItemsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ request: req, err: err.stack });
  next();
});

app.listen(process.env.PORT || 80, () => console.log(`alive on http://localhost:${process.env.PORT || 80}`));

export default app;
