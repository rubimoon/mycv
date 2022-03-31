import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, User } from '../entities';
import { CreateReportDto } from './dtos';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(user: User, report: CreateReportDto) {
    const entity = this.repo.create(report);
    entity.user = user;
    return this.repo.save(entity);
  }
}
