import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, CurrentUser } from 'src/auth';
import { Serialize } from '../common';
import { User } from '../entities';
import { CreateReportDto, ReportDto } from './dtos';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@CurrentUser() user: User, @Body() body: CreateReportDto) {
    return this.reportsService.create(user, body);
  }
}
