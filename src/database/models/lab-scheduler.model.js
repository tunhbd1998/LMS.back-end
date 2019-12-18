import { connection } from '../connection';

const LabSchedulerModel = connection.define(
  'lab_scheduler',
  {},
  { tableName: 'lab_scheduler', timestamps: false }
);

export { LabSchedulerModel };
