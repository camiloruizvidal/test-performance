import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('testTypeOrmVSequelize')
  async testTypeOrmVSequelize() {
    return await this.appService.testTypeOrmVSequelize(10000);
  }
}
