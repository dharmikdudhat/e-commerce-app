/* eslint-disable prettier/prettier */
// log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntity } from '../../Entities/logging.entity';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async createLog(logData: Partial<LogEntity>): Promise<LogEntity> {
    const log = this.logRepository.create(logData);
    return await this.logRepository.save(log);
  }

  async getlogsByStatusCode(statusCode: number) {
    return await this.logRepository.find({
      where: { statusCode },
    });
  }

  async getLogsByUserId(createdBy: string) {
    return await this.logRepository
      .createQueryBuilder('log')
      .where('log.created_by = :createdBy', { createdBy })
      .leftJoinAndSelect('log.created_by', 'user')
      .getMany();
  }
}
