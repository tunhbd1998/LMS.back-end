import { isEmpty } from 'lodash';

class BaseService {
  formatQueryOptions({ conditions, fields, limit, offset, order }) {
    return {
      where: conditions || {},
      attributes: isEmpty(fields) === 0 ? undefined : fields,
      limit: limit || undefined,
      offset: offset || undefined,
      order: order || undefined,
    };
  }

  findOne(model, { conditions, fields }) {
    return new Promise((resolve, reject) => {
      model
        .findOne(this.formatQueryOptions({ conditions, fields }))
        .then(res => resolve(res ? res.dataValues : null))
        .catch(err => reject(err));
    });
  }

  findMany(model, { conditions, fields, limit, offset, order }) {
    return new Promise((resolve, reject) => {
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
}

export const baseService = new BaseService();
