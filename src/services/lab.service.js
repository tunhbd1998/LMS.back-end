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


  
  getLabById(labId) {
    return new Promise((resolve,reject) =>{
      const conn = createConnection();
      const LabModel = getLabModel(conn);
      baseService.findOne(LabModel,{
        conditions: {id : labId},
        fields : [ 'id' , 'name' , 'university' ,'specialize' , 'confirmFile','description'],
     
      })
      .then(labs => {
        conn.close();
        resolve(labs) 
      })
      .catch(err => {
        conn.close();
        reject(err)
      });
    });
  }
  
  findAllLab(limit = null, offset = null, order = null){
    return new Promise((resolve,reject) => {
      const conn = createConnection();
      const LabModel = getLabModel(conn);

      baseService.findMany(LabModel,{conditions: null,fields: ['name','university','specialize'],
                  limit,
                  offset,
                  order,
                })
                  .then(labs => resolve(labs))
                  .catch(err => reject(err));

    });
  }
}



export const labService = new LabService();
