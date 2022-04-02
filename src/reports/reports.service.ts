import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, User } from '../entities';
import { CreateReportDto, GetEstimateDto } from './dtos';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(user: User, dto: CreateReportDto) {
    const entity = this.repo.create(dto);
    entity.user = user;
    return this.repo.save(entity);
  }
  async changeApproval(id: string, approved: boolean) {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException('report not found');
    }

    entity.approved = approved;
    return this.repo.save(entity);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make= :make', { make })
      .andWhere('model= :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
