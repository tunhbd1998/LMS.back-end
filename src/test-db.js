import { createConnection, getUserModel } from './database';
import { getLabModel } from './database/models/lab.model';

const conn = createConnection();

conn
  .authenticate()
  .then(async () => {
    const LabModel = getLabModel(conn);
    const UserModel = getUserModel(conn);

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
    LabModel.findAll({
      where: {
        id: lab.id,
      },
      include: [UserModel],
    }).then(us => console.logog(us.map(u => u.dataValues)));
  })
  .catch(err => console.log(err));
