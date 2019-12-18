import { omit, get } from 'lodash';
import { Op } from 'sequelize';
import { FETCH_DATA, USER_ROLE_ID } from '../config';
import { connection } from '../database';
import { BaseService } from './base.service';
import { userService } from './user.service';
import { labAddressService } from './lab-address.service';
import { generateId } from '../utils/fields';
import { LabAddressModel } from '../database/models/lab-address.model';
import { LabModel } from '../database/models/lab.model';
import { LabMemberModel } from '../database/models/lab-member.model';
import { labMemberService } from './lab-member.service';

class LabService extends BaseService {
  constructor() {
    super(LabModel);
  }

  async getLabDetail(id) {
    const lab = await this.findOne({
      where: { id },
      include: [
        {
          model: LabAddressModel,
          as: 'address',
          required: false,
          attributes: ['province', 'ward', 'detail']
        }
      ]
    });

    return lab;
  }

  async filterLabs(name, university, specialize, province, page, pageSize) {
    const limit = pageSize || FETCH_DATA.PAGE_SIZE.LAB;
    const offset = (page - 1) * limit;
    const totalCount = await this.count({
      where: { name, university, specialize },
      include: [
        {
          model: LabAddressModel,
          as: 'address',
          required: false,
          where: { province }
        }
      ]
    });

    const totalPage = Math.ceil((totalCount * 1.0) / limit);

    if (page > totalPage) {
      return { page, totalPage, labs: [] };
    }

    const labs = await this.findMany({
      where: { name, university, specialize },
      attributes: ['id', 'name', 'university', 'specialize'],
      limit,
      offset,
      include: [
        {
          model: LabAddressModel,
          as: 'address',
          required: false,
          where: { province },
          attributes: ['province', 'ward', 'detail']
        }
      ]
    });

    return { page, totalPage, labs };
  }

  async getHighlightLabs(page, pageSize) {
    const limit = pageSize || FETCH_DATA.PAGE_SIZE.LAB;
    const offset = (page - 1) * limit;
    const totalCount = await this.count({
      where: {}
    });

    const totalPage = Math.ceil((totalCount * 1.0) / limit);

    if (page > totalPage) {
      return { page, totalPage, labs: [] };
    }

    const labs = await this.findMany({
      where: {},
      attributes: ['id', 'name', 'university', 'specialize'],
      limit,
      offset,
      include: [
        {
          model: LabAddressModel,
          as: 'address',
          required: false,
          where: {},
          attributes: ['province', 'ward', 'detail']
        }
      ]
    });

    return { page, totalPage, labs };
  }

  async signUpNewLab(adminData, labData) {
    return connection.transaction(t =>
      userService
        .createOne(
          { ...adminData, role: USER_ROLE_ID.LAB_ADMIN },
          { transaction: t }
        )
        .then(admin =>
          labAddressService
            .createOne(
              {
                ...labData.address,
                labId: generateId()
              },
              { transaction: t }
            )
            .then(address =>
              this.createOne(
                {
                  ...labData,
                  id: address.labId,
                  adminId: admin.username,
                  addressId: address.labId
                },
                { transaction: t }
              ).then(lab => ({ ...lab, admin, address }))
            )
        )
    );
  }

  async addLabMember(labId, data) {
    return connection.transaction(t =>
      userService.createOne(omit(data, ['position'])).then(user =>
        LabMemberModel.create({
          labId,
          userId: user.username,
          position: get(data, 'position', null)
        }).then(() => user)
      )
    );
  }

  async getLabMemberList(labId, page, pageSize) {
    return {
      page,
      totalPage: 0,
      labMembers: []
    };
    // const limit = pageSize;
    // const offset = (page - 1) * limit;
    // const totalCount = await labMemberService.count({
    //   where: {
    //     labId
    //   }
    // });
    // const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

    // if (page > totalPage) {
    //   return {
    //     page,
    //     totalPage,
    //     labMembers: []
    //   };
    // }

    // let labMembers = await labMemberService.findMany({
    //   where: { labId },
    //   attributes: ['userId', 'position']
    // });
    // labMembers = await userService.findMany({
    //   where: {
    //     username: {
    //       [Op.in]: labMembers
    //     }
    //   },
    //   attributes: ['fullname']
    // });
  }
}

export const labService = new LabService();
