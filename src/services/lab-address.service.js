import { get } from 'lodash';
import { LabAddressModel } from '../database/models/lab-address.model';
import { BaseService } from './base.service';

class LabAddressService extends BaseService {
  constructor() {
    super(LabAddressModel);
  }
}

export const labAddressService = new LabAddressService();
