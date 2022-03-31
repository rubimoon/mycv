import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Report } from '../entities';

export default (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<any>('TYPEORM_CONNECTION'),
  database: config.get<string>('TYPEORM_DATABASE'),
  synchronize: config.get<boolean>('TYPEORM_SYNCHRONIZE'),
  entities: [User, Report],
});
