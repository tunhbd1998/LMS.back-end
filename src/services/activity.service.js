import { createConnection } from '../database';
import { baseService } from './base.service';
import { getActivityModel } from '../database/models/activity.model';

class ActivityService {

  getActivityById(activityId) {


    return new Promise((resolve,reject) =>{
      const conn = createConnection();
      const activityModel = getActivityModel(conn);
      baseService.findOne(activityModel,{
        conditions: {id : activityId},
        fields : [ 'id' , 'name' , 'address', 'image','imageId','startTime','endTime','detail' ],
     
      })
      .then(activity => {
        conn.close();
        resolve(activity) 
      })
      .catch(err => {
        conn.close();
        reject(err)
      });
    });
  }
  
}



export const activityService = new ActivityService();
