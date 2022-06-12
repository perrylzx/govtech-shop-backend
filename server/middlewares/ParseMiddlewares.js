import { isEmpty } from 'lodash';
import { Op } from 'sequelize';

export const parseGetItemsQuery = (queryParams) => {
  if (isEmpty(queryParams)) {
    return null;
  }
  const whereObject = {
    ...(queryParams.name && {
      name: {
        [Op.iLike]: `%${queryParams.name}%`,
      },
    }),
    ...(queryParams.minAmount && {
      price: {
        [Op.gte]: queryParams.minAmount,
      },
    }),
    ...(queryParams.maxAmount && {
      price: {
        [Op.lte]: queryParams.maxAmount,
      },
    }),
    ...(queryParams.minAmount && queryParams.maxAmount) && {
      price: {
        [Op.between]: [queryParams.minAmount, queryParams.maxAmount],
      },
    },
  };
  return whereObject;
};

export default parseGetItemsQuery;
