import { Op } from 'sequelize';
import { createConnection } from '../database';
import { getRecruitmentModel } from '../database/models/recruitment.model';
import { baseService } from './base.service';
import { getLabModel } from '../database/models/lab.model';
import { getProjectModel } from '../database/models/project.model';
import { getLabAddressModel } from '../database/models/lab-address.model';
import { getLabImageModel } from '../database/models/lab-image.model';

class RecruitmentService {
  countProjectMemberRectruitments(labId = null, projectId = null, status) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const RecruitmentModel = getRecruitmentModel(conn);

      baseService
        .count(RecruitmentModel, {
          conditions: {
            ...(labId ? { forLab: labId } : {}),
            forProject: projectId ? projectId : { [Op.not]: null },
            ...(status < 0 || status >= 2 ? {} : { isOpen: status })
          }
        })
        .then(count => {
          conn.close();
          console.log('count', count);
          resolve(count);
        })
        .catch(err => {
          conn.close();
          reject(err);
        });
    });
  }

  findProjectMemberRecruitments(
    labId = null,
    projectId = null,
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
            ...(labId ? { forLab: labId } : {}),
            forProject: projectId ? projectId : { [Op.not]: null },
            ...(status < 0 || status >= 2 ? {} : { isOpen: status })
          },
          fields: ['id', 'position', 'forLab', 'forProject'],
          limit,
          offset,
          order
        })
        .then(async recruitments => {
          const LabModel = getLabModel(conn);
          const ProjectModel = getProjectModel(conn);
          const recruits = await Promise.all(
            recruitments.map(async rcm => {
              return {
                ...rcm,
                forLab: await baseService.findOne(LabModel, {
                  conditions: {
                    id: rcm.forLab
                  },
                  fields: ['id', 'name']
                }),
                forProject: await baseService.findOne(ProjectModel, {
                  conditions: {
                    id: rcm.forProject
                  },
                  fields: ['id', 'name', 'image']
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

  countLabMemberRecruitments(labId = null, status = 0) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const RecruitmentModel = getRecruitmentModel(conn);

      baseService
        .count(RecruitmentModel, {
          conditions: {
            forProject: null,
            ...(labId ? { labId } : {}),
            ...(status >= 2 || status < 0 ? {} : { isOpen: status })
          }
        })
        .then(count => {
          resolve(count);
        })
        .catch(err => {
          conn.close();
          reject(err);
        });
    });
  }

  findLabMemberRecruitments(
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
              const query = `SELECT l.id, l.name, li.image
                FROM lab l LEFT JOIN lab_image li ON l.id = li.labId
                WHERE l.id='${rcm.forLab}'`;
              return {
                ...rcm,
                forLab: await LabModel.findOne({
                  where: {
                    id: rcm.forLab
                  },
                  attributes: ['id', 'name'],
                  include: [
                    {
                      model: getLabImageModel(conn),
                      attributes: ['image']
                    }
                  ]
                }).then(res => {
                  return res.dataValues;
                })
                // forLab: await conn
                //   .query(query, {
                //     model: LabModel,
                //     mapToModel: true
                //   })
                //   .then(res => {
                //     return res[0].dataValues;
                //   })
              };
              // return {
              //   ...rcm,
              //   forLab: await baseService.findOne(LabModel, {
              //     conditions: {
              //       id: rcm.forLab
              //     },
              //     fields: ['id', 'name', 'labImage']
              //   })
              // };
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

export const recruitmentService = new RecruitmentService();
