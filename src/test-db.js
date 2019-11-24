import debug from 'debug';
import { createConnection, getUserModel } from './database';
import { getLabModel } from './database/models/lab.model';
// import sequelize from 'sequelize';
import { getProjectMemberModel } from './database/models/project-member.model';
import { getRecruitmentModel } from './database/models/recruitment.model';
import { labService } from './services/lab.service';

const conn = createConnection();
const log = debug('LMS:test-db');

conn
  .authenticate()
  .then(async () => {
    const LabModel = getLabModel(conn);
    const UserModel = getUserModel(conn);
    const ProjectMemberModel = getProjectMemberModel(conn);
    const RecruitmentModel = getRecruitmentModel(conn);

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
      admin: user.username,
    };

    const recruitment = {
      id: 'afd03b02-0add-11ea-8d71-362b9e155667',
      forLab: lab.id,
    };

    // await UserModel.create(user).then(user => log('created user ' + user));
    // await LabModel.create(lab).then(lab => log('created lab ' + lab));
    // await RecruitmentModel.create(recruitment).then(rcm =>
    //   log('created recruitment: ' + rcm)
    // );
    await labService
      .findMemberRecruitments(lab.id)
      .then(rcms => log('gotten rcms:' + JSON.stringify(rcms)));
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

    // ProjectMemberModel.findAll({
    //   attributes: ['projectId'],
    //   limit: 1,
    //   offset: 1,
    //   order: undefined,
    // }).then(us => {
    //   console.log(us.map(u => u.dataValues));
    // });
  })
  .catch(err => console.log(err));
