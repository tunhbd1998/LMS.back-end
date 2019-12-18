import { isEmpty, omit, keysIn, get } from 'lodash';
import { Model } from 'sequelize';
import { LMSError } from '../defines/errors';

export class BaseService {
  constructor(model) {
    this.model = model;
  }

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
    attributes,
    limit,
    offset,
    order,
    include,
    transaction,
    ...otherOptions
  }) {
    return {
      where: this.formatWhere(where),
      attributes: isEmpty(attributes) ? undefined : attributes,
      limit: limit || undefined,
      offset: offset || undefined,
      order: order || undefined,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            where: this.formatWhere(icl.where)
          })),
      transaction: transaction || undefined,
      ...otherOptions
    };
  }

  formatCountQueryOptions({
    where,
    attributes,
    col,
    include,
    transaction,
    ...otherOptions
  }) {
    return {
      where: this.formatWhere(where),
      attributes: isEmpty(attributes) ? undefined : attributes,
      col: col || undefined,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            where: this.formatWhere(icl.where)
          })),
      transaction: transaction || undefined,
      ...otherOptions
    };
  }

  async isExists(conditions, fieldToCheck) {
    const ret = await this.model.findOne({
      where: conditions,
      attributes: [fieldToCheck]
    });

    return ret ? true : false;
  }

  async findOne(options) {
    const ret = await this.model.findOne(this.formatQueryOptions(options));

    return get(ret, 'dataValues');
  }

  async findOneByPrimaryKey(primaryKey, primaryKeyValue, fields) {
    return this.findOne(
      this.formatQueryOptions({
        where: { [primaryKey]: primaryKeyValue },
        attributes: fields
      })
    );
  }

  async findMany(options) {
    const rets = await this.model.findAll(this.formatQueryOptions(options));

    return rets.map(ret => get(ret, 'dataValues'));
  }

  async count(options) {
    return this.model.count(this.formatQueryOptions(options));
  }

  async createOne(values, options) {
    const ret = await this.model.create(values, options);

    return get(ret, 'dataValues');
  }

  async updateOne(values, options) {
    const ret = await this.model.update(values, options);

    return ret.length > 0;
  }
}
