import { connection } from '../connection';

const ProjectSchedulerModel = connection.define(
  'project_scheduler',
  {},
  { tableName: 'project_scheduler', timestamps: false }
);

export { ProjectSchedulerModel };
