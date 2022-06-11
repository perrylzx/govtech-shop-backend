import { get } from 'lodash';
import { Items } from '../db/models/index';
import { validateDeleteItems, validatePostItems, validatePutItems } from '../middlewares/ValidationMiddlewares';

const express = require('express');

const router = express.Router();

// Todo: Create tests
router.get('/', async (_, res) => {
  const items = await Items.findAll({
    order: [['updatedAt', 'DESC']],
  });
  const itemCount = await Items.count();
  res.send({ items, itemCount });
});

router.post('/', validatePostItems, async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const item = await Items.create({ name, price });
    res.send(item);
  } catch (err) {
    next(err);
  }
  next();
});

router.put('/', validatePutItems, async (req, res, next) => {
  const { name, price, id } = req.body;
  try {
    const updateItemResponse = await Items.update({ name, price }, {
      where: {
        id,
      },
      returning: true,
    });
    const updatedItem = get(updateItemResponse, ['1', '0']);
    if (!updatedItem) {
      res.status(404).send(`No items with id ${id} was found`);
    }
    res.send(updatedItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/', validateDeleteItems, async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedItem = await Items.destroy({
      where: {
        id,
      },
    });
    if (deletedItem === 0) {
      res.status(404).send(`No items with id ${id} was found`);
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
