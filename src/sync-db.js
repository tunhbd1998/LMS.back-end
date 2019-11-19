import { createConnection, getUserModel } from './database';
import { getLabModel } from './database/models/lab.model';
import { getApplyRecruitmentModel } from './database/models/apply-recruitment.model';
import { getActivityModel } from './database/models/activity.model';
import { getLabAddressModel } from './database/models/lab-address.model';
import { getLabMemberModel } from './database/models/lab-member.model';
import { getRecruitmentModel } from './database/models/recruitment.model';
import { getTakePartInActivityModel } from './database/models/take-part-in-activity.model';
import { getProjectModel } from './database/models/project.model';
import { getBookingModel } from './database/models/booking.model';
import { getLabSchedulerModel } from './database/models/lab-scheduler.model';
import { getProjectMemberModel } from './database/models/project-member.model';
import { getProjectSchedulerModel } from './database/models/project-scheduler.model';
import { getSchedulerModel } from './database/models/scheduler.model';
import { getToolModel } from './database/models/tool.model';

const conn = createConnection();

conn
  .authenticate()
  .then(async () => {
    // await conn
    //   .dropSchema('lms')
    //   .then(() => console.log('drop db successful'))
    //   .catch(err => console.log(err));
    // await conn
    //   .createSchema('lms')
    //   .then(() => console.log('create schema lms successful'))
    //   .catch(err => console.log(err));
    getActivityModel(conn);
    // getApplyRecruitmentModel(conn);
    getBookingModel(conn);
    getLabAddressModel(conn);
    // getLabMemberModel(conn);
    // getLabSchedulerModel(conn);
    getLabModel(conn);
    // getProjectMemberModel(conn);
    // getProjectSchedulerModel(conn);
    getProjectModel(conn);
    getRecruitmentModel(conn);
    getSchedulerModel(conn);
    // getTakePartInActivityModel(conn);
    getToolModel(conn);
    getUserModel(conn);

    conn.sync().then(() => {
      console.log('sync db successful');
    });
  })
  .catch(err => console.log(err));
