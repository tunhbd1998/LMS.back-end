import { Op } from 'sequelize';
import { RecruitmentModel } from '../database/models/recruitment.model';
import { BaseService } from './base.service';
import { LabModel } from '../database/models/lab.model';
import { ProjectModel } from '../database/models/project.model';

class RecruitmentService extends BaseService {
  constructor() {
    super(RecruitmentModel);
  }

  async countProjectMemberRectruitments(labId, projectId, status) {
    return this.count({
      where: {
        ...(labId ? { forLab: labId } : {}),
        forProject: projectId ? projectId : { [Op.not]: null },
        ...(status < 0 || status >= 2 ? {} : { isOpen: status })
      }
    });
  }

  async findProjectMemberRecruitments(
    labId,
    projectId,
    status = 2,
    limit,
    offset,
    order
  ) {
    return this.findMany({
      where: {
        ...(labId ? { forLab: labId } : {}),
        forProject: projectId ? projectId : { [Op.not]: null },
        ...(status < 0 || status >= 2 ? {} : { isOpen: status })
      },
      include: [
        {
          model: LabModel,
          as: 'forLab',
          attributes: ['id', 'name'],
          required: false
        },
        {
          model: ProjectModel,
          as: 'forProject',
          required: false,
          attributes: ['id', 'name']
        }
      ],
      fields: ['id', 'position', 'forLab', 'forProject'],
      limit,
      offset,
      order
    });
  }

  async countLabMemberRecruitments(labId = null, status = 0) {
    return this.count({
      where: {
        forProject: null,
        ...(labId ? { labId } : {}),
        ...(status >= 2 || status < 0 ? {} : { isOpen: status })
      }
    });
  }

  async findLabMemberRecruitments(
    labId = null,
    status = 2,
    limit = null,
    offset = null,
    order = null
  ) {
    return this.findMany({
      where: {
        forProject: null,
        ...(labId ? { labId } : {}),
        ...(status >= 2 || status < 0 ? {} : { isOpen: status })
      },
      attributes: ['id', 'forLab', 'position'],
      include: [
        {
          model: LabModel,
          as: 'forLab',
          attributes: ['id', 'name'],
          required: false
        }
      ],
      limit,
      offset,
      order
    });
  }
}

export const recruitmentService = new RecruitmentService();
