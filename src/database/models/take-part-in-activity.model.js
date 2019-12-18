import { connection } from '../connection';

const TakePartInActivityModel = connection.define(
  'take_part_in_activity',
  {},
  { tableName: 'take_part_in_activity', timestamps: false }
);

export { TakePartInActivityModel };
