import { Items } from '../db/models/index';

const express = require('express');

const router = express.Router();

// Todo: Validate request, handle errors, create tests
router.get('/', async (_, res) => {
  const items = await Items.findAll();
  res.send(items);
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const item = await Items.create({ name, price });
  res.send(item);
});

router.put('/', async (req, res) => {
  const { name, price, id } = req.body;
  try {
    const item = await Items.upsert({ name, price }, {
      where: {
        id,
      },
    });
    res.send(item[0]);
  } catch (err) {
    res.send(err);
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    const deletedItem = Items.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    res.send(err);
  }
});

export default router;
