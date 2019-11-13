import { omit, isEmpty, keys } from 'lodash';
import uuidv1 from 'uuid/v1';

export const isEnoughFields = (obj, fields) => {
  return isEmpty(omit(obj, fields)) && keys(obj).length === fields.length;
};

export const generateId = () => uuidv1();
