import { BaseService } from './base.service';
import { LabMemberModel } from '../database/models/lab-member.model';

class LabMemberService extends BaseService {
  constructor() {
    super(LabMemberModel);
  }
}

export const labMemberService = new LabMemberService();
