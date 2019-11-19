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

  findMemberRecruitments(labId, limit = null, offset = null, order = null) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const RecruitmentModel = getRecruitmentModel(conn);

      baseService
        .findMany(RecruitmentModel, {
          conditions: {
            forLab: labId,
            forProject: null,
            isOpen: 1,
          },
          fields: ['id', 'forLab', 'position'],
          limit,
          offset,
          order,
        })
        .then(async recruitments => {
          const LabModel = getLabModel(conn);
          const recruits = await Promise.all(
            recruitments.map(async rcm => {
              return {
                ...rcm,
                forLab: await baseService.findOne(LabModel, {
                  conditions: {
                    id: rcm.forLab,
                  },
                  fields: ['id', 'name', 'labImage'],
                }),
              };
            })
          );
          resolve(recruits);
        })
        .catch(err => reject(err));
    });
  }
}

export const labService = new LabService();
