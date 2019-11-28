import { createConnection } from '../database';
import { getRecruitmentModel } from '../database/models/recruitment.model';
import { baseService } from './base.service';
import { getLabModel } from '../database/models/lab.model';

class LabService {
  // findMany({conditions, fields, limit, offset, order}) {
  //   return new Promise((resolve, reject) => {
  //     const conn = createConnection();
  //     const RecruitmentModel = getRecruitmentModel(conn);
  //     baseService.findMany({
  //       conditions,
  //     });
  //   });
  // }
  // findOne({conditions, fields}) {
  //   return new Promise((resolve, reject) => {
  //     const conn = createConnection()
  //   })
  // }
  // status: 0 - closed, 1 - opened, 2 - all
}

export const labService = new LabService();
