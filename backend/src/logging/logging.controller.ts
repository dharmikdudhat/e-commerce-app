/* eslint-disable prettier/prettier */
// log.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LogEntity } from './entity/logging.entity';
import { LoggingService } from './logging.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LoggingService) {}

  @Post()
  async createLog(@Body() logData: Partial<LogEntity>) {
    const Data =  await this.logService.createLog(logData);
    return {
      isError: false,
      message: "Log Created Successfully",
      data : Data,
    }
  }

  @Get('status-code')
  async getlogsByStatusCode(@Query('code') statusCode: number) {
    const logsbycode = await this.logService.getlogsByStatusCode(statusCode);
    return { logsbycode };
  }

  @Get('id')
  async getlogsByUserId(@Query('id') created_by: string) {
    const logsbycode = await this.logService.getLogsByUserId(created_by);
    return { 
      isError : "false",
      message : "Logs done By the User are : ",
      data : logsbycode };
  }
}

