import { omit, isEmpty, keys } from 'lodash';
import uuidv1 from 'uuid/v1';

export const isEnoughFields = (obj, fields, checkFull = false) => {
  let flag = isEmpty(omit(obj, fields));

  if (checkFull) {
    flag = flag && keys(obj).length === fields.length;
  }

  return flag;
};

export const generateId = () => uuidv1();
