import { ActivityModel } from '../database/models/activity.model';
import { BaseService } from './base.service';

class ActivityService extends BaseService {
  constructor() {
    super(ActivityModel);
  }
}

export const activityService = new ActivityService();
