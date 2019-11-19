import { createConnection, getUserModel } from './database';
import { getLabModel } from './database/models/lab.model';
// import sequelize from 'sequelize';
import { getProjectMemberModel } from './database/models/project-member.model';

const conn = createConnection();

conn
  .authenticate()
  .then(async () => {
    const LabModel = getLabModel(conn);
    const UserModel = getUserModel(conn);
    const ProjectMemberModel = getProjectMemberModel(conn);

    const user = {
      username: 'tunh',
      password: 'tunh',
      fullname: 'nguyen huu tu',
      email: 'tunhbd1998@gmail.com',
    };

    const lab = {
      id: 'c6bf8be2-0a92-11ea-9a9f-362b9e155667',
      name: 'lab demo',
      university: 'university of science',
      admin: 'tunh',
    };

    // await UserModel.create(user).then(user => console.log('user', user));
    // await LabModel.create(lab).then(lab => console.log('lab', lab));
    // LabModel.findAll({
    //   where: {},
    //   attributes: undefined,
    //   include: [
    //     {
    //       model: UserModel,
    //       // as: 'admin',
    //       attributes: ['username'],
    //       // association: sequelize.BelongsTo,
    //     },
    //   ],
    // }).then(us => console.log(us.map(u => JSON.stringify(u.dataValues))));

    ProjectMemberModel.findAll({
      attributes: ['projectId'],
      limit: 1,
      offset: 1,
      order: undefined,
    }).then(us => {
      console.log(us.map(u => u.dataValues));
    });
  })
  .catch(err => console.log(err));
