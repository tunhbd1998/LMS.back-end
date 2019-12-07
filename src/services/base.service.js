import { isEmpty, omit, keysIn } from 'lodash';
import { Model } from 'sequelize';
import { LMSError } from '../defines/errors';

class BaseService {
  formatWhere(where) {
    if (isEmpty(where)) {
      return {};
    }

    return omit(
      where,
      keysIn(where).filter(field => isEmpty(where[field]))
    );
  }

  formatQueryOptions({
    where,
    fields,
    limit,
    offset,
    order,
    include,
    transaction
  }) {
    return {
      where: this.formatWhere(where),
      attributes: isEmpty(fields) ? undefined : fields,
      limit: limit || undefined,
      offset: offset || undefined,
      order: order || undefined,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            where: this.formatWhere(icl.where)
          })),
      transaction: transaction || undefined
    };
  }

  formatCountQueryOptions({
    where,
    groupByAttributes,
    countOnCol,
    include,
    transaction
  }) {
    return {
      where: this.formatWhere(where),
      attributes: isEmpty(groupByAttributes) ? undefined : groupByAttributes,
      col: countOnCol || undefined,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            where: this.formatWhere(icl.where)
          })),
      transaction: transaction || undefined
    };
  }

  findOne(model, { where, fields, include, transaction }) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .findOne(
          this.formatQueryOptions({ where, fields, include, transaction })
        )
        .then(res => resolve(res ? res.dataValues : null))
        .catch(err => reject(err));
    });
  }

  findMany(
    model,
    { where, fields, limit, offset, order, include, transaction }
  ) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .findAll(
          this.formatQueryOptions({
            where,
            fields,
            limit,
            offset,
            order,
            include,
            transaction
          })
        )
        .then(resArr =>
          resolve(!isEmpty(resArr) ? resArr.map(res => res.dataValues) : [])
        )
        .catch(err => reject(err));
    });
  }

  count(model, { where, groupByAttributes, countOnCol, include }) {
    return new Promise((resolve, reject) => {
      if (!model) {
        reject(new LMSError(500, `model is ${model}`));
      }

      model
        .count(
          this.formatCountQueryOptions({
            where,
            groupByAttributes,
            countOnCol,
            include
          })
        )
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

export const baseService = new BaseService();
