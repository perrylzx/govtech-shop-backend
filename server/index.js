/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 80, () => console.log(`alive on http://localhost:${process.env.PORT || 80}`));

export default app;
