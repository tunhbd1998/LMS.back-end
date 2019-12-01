import { isEmpty } from 'lodash';
import { LMSError } from '../defines/errors';

class BaseService {
  formatQueryOptions({ conditions, fields, limit, offset, order }) {
    return {
      where: conditions || {},
      attributes: isEmpty(fields) === 0 ? undefined : fields,
      limit: limit || undefined,
      offset: offset || undefined,
      order: order || undefined
    };
  }

  findOne(model, { conditions, fields }) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .findOne(this.formatQueryOptions({ conditions, fields }))
        .then(res => resolve(res ? res.dataValues : null))
        .catch(err => reject(err));
    });
  }

  findMany(model, { conditions, fields, limit, offset, order }) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .findAll(
          this.formatQueryOptions({ conditions, fields, limit, offset, order })
        )
        .then(resArr =>
          resolve(!isEmpty(resArr) ? resArr.map(res => res.dataValues) : [])
        )
        .catch(err => reject(err));
    });
  }

  count(model, conditions) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .count(this.formatQueryOptions({ conditions }))
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

export const baseService = new BaseService();
