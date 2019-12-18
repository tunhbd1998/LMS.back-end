import { connection } from '../connection';

const ProjectMemberModel = connection.define(
  'project_member',
  {},
  {
    tableName: 'project_member',
    timestamps: false
  }
);

export { ProjectMemberModel };
