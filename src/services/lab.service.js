import { isEmpty } from 'lodash';
import { createConnection } from '../database';
import { getRecruitmentModel } from '../database/models/recruitment.model';
import { baseService } from './base.service';
import { getLabModel } from '../database/models/lab.model';
import { getLabAddressModel } from '../database/models/lab-address.model';
import { getLabMemberModel} from '../database/models/lab-member.model';
class LabService {
  getLabById(id) {
    const conn = createConnection();
    const LabModel = getLabModel(conn);

    return baseService.findOne(LabModel, {
      where: { id },
      include: [
        { model: getLabAddressModel(conn), as: 'address', required: false }
      ]
    });
  }
  addLabMember(data) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const labMemberModel = getLabMemberModel(conn);

      conn
        .authenticate()
        .then(async () => {
          labMemberModel
            .create(
              { ...data },
              {}
            )
            .then(labMember => {
              conn.close();
              resolve(labMember.dataValues);
            })
            .catch(err => {
              conn.close();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }



  // findLabs({ name, university, specialize, province, limit, offset, order }) {
  //   return new Promise((resolve, reject) => {
  //     const conn = createConnection();
  //     const LabModel = getLabModel(conn);
  //     const query = `SELECT l.id, l.name, l.university, l.specialize, la.province, la.detail
  //       FROM lab l JOIN lab_address la ON l.id = la.labId
  //       WHERE
  //         l.id IS NOT NULL
  //         ${!isEmpty(name) ? `AND MATCH(l.name) AGAINST('${name}')` : ''}
  //         ${
  //           !isEmpty(university) && university !== 'all'
  //             ? `AND l.university='${university}'`
  //             : ''
  //         }
  //         ${
  //           !isEmpty(specialize) && specialize !== 'all'
  //             ? `AND l.specialize='${specialize}'`
  //             : ''
  //         }
  //         ${
  //           !isEmpty(province) && province !== 'all'
  //             ? `AND la.province='${province}'`
  //             : ''
  //         }
  //       ${!isEmpty(limit) ? `LIMIT ${limit}` : ''}
  //       ${!isEmpty(offset) ? `OFFSET ${offset}` : ''}`;

  //     conn
  //       .query(query, {
  //         model: LabModel,
  //         mapToModel: true
  //       })
  //       .then(res => {
  //         conn.close();
  //         resolve(
  //           res.map(lab => {
  //             const data = lab.dataValues;

  //             return {
  //               ...data,
  //               address: {
  //                 province: data.province,
  //                 detail: data.detail
  //               },
  //               province: undefined,
  //               detail: undefined
  //             };
  //           })
  //         );
  //       })
  //       .catch(err => {
  //         conn.close();
  //         reject(err);
  //       });
  //   });
  // }

  findMany({ where, fields, limit, offser, order, include, transaction }) {
    const conn = createConnection();
    const LabModel = getLabModel(conn);

    return baseService.findMany(LabModel, {
      where,
      fields,
      limit,
      offser,
      order,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            model: icl.model(conn)
          })),
      transaction
    });
  }
  getLabMemberList({ where, fields, limit, offser, order, include, transaction }) {
    const conn = createConnection();
    const LabMemberModel = getLabMemberModel(conn);

    return baseService.findMany(LabMemberModel, {
      where,
      fields,
      limit,
      offser,
      order,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            model: icl.model(conn)
          })),
      transaction
    });
  }






  countLabsBy({ name, university, specialize, province }) {
    return new Promise((resolve, reject) => {
      const conn = createConnection();
      const LabModel = getLabModel(conn);
      const query = `SELECT l.id
        FROM lab l JOIN lab_address la ON l.id = la.labId
        WHERE 
          l.id IS NOT NULL
          ${!isEmpty(name) ? `AND MATCH(l.name) AGAINST('${name}')` : ''}
          ${
            !isEmpty(university) && university !== 'all'
              ? `AND l.university='${university}'`
              : ''
          }
          ${
            !isEmpty(specialize) && specialize !== 'all'
              ? `AND l.specialize='${specialize}'`
              : ''
          }
          ${
            !isEmpty(province) && province !== 'all'
              ? `AND la.province='${province}'`
              : ''
          }`;

      conn
        .query(query, {
          model: LabModel,
          mapToModel: true
        })
        .then(res => {
          conn.close();
          resolve(res.length);
        })
        .catch(err => {
          conn.close();
          reject(err);
        });
    });
  }

  count({ where, groupByAttributes, countOnCol, include } = {}) {
    const conn = createConnection();
    const LabModel = getLabModel(conn);

    return baseService.count(LabModel, {
      where,
      groupByAttributes,
      countOnCol,
      include: isEmpty(include)
        ? undefined
        : include.map(icl => ({
            ...icl,
            model: icl.model(conn)
          }))
    });
  }
}

export const labService = new LabService();
