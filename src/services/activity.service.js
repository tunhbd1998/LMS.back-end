import { Op } from 'sequelize';
import { ActivityModel } from '../database/models/activity.model';
import { BaseService } from './base.service';
import { FETCH_DATA } from '../config';

class ActivityService extends BaseService {
  constructor() {
    super(ActivityModel);
  }

  async getActiveActivities(
    page = 1,
    pageSize = FETCH_DATA.PAGE_SIZE.ACTIVITY,
    labId = null
  ) {
    const limit = pageSize;
    const offset = (page - 1) * limit;
    const totalCount = await this.count({
      where: {
        ...(labId ? { labId } : {}),
        endTime: {
          [Op.gt]: new Date()
        }
      }
    });
    const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

    if (page > totalPage) {
      return { page, totalPage, activities: [] };
    }

    const activities = await this.findMany({
      where: {
        ...(labId ? { labId } : {}),
        endTime: {
          [Op.gt]: new Date()
        }
      },
      limit,
      offset
    });

    return { page, totalPage, activities };
  }
}

export const activityService = new ActivityService();
