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
  countMemberRecruitments(labId = null, status = 0) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const RecruitmentModel = getRecruitmentModel(conn);

      baseService
        .findMany(RecruitmentModel, {
          conditions: {
            forProject: null,
            ...(labId ? { labId } : {}),
            ...(status >= 2 || status < 0 ? {} : { isOpen: status })
          },
          fields: ['id']
        })
        .then(recruitments => {
          conn.close();
          resolve(recruitments.length);
        })
        .catch(err => {
          conn.close();
          reject(err);
        });
    });
  }

  findMemberRecruitments(
    labId = null,
    status = 2,
    limit = null,
    offset = null,
    order = null
  ) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const RecruitmentModel = getRecruitmentModel(conn);

      baseService
        .findMany(RecruitmentModel, {
          conditions: {
            forProject: null,
            ...(labId ? { labId } : {}),
            ...(status >= 2 || status < 0 ? {} : { isOpen: status })
          },
          fields: ['id', 'forLab', 'position'],
          limit,
          offset,
          order
        })
        .then(async recruitments => {
          const LabModel = getLabModel(conn);
          const recruits = await Promise.all(
            recruitments.map(async rcm => {
              return {
                ...rcm,
                forLab: await baseService.findOne(LabModel, {
                  conditions: {
                    id: rcm.forLab
                  },
                  fields: ['id', 'name', 'labImage']
                })
              };
            })
          );
          conn.close();
          resolve(recruits);
        })
        .catch(err => {
          conn.close();
          reject(err);
        });
    });
  }
}

export const labService = new LabService();
