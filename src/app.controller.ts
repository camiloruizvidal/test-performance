import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('testTypeOrm')
  async testTypeOrm() {
    return await { testTypeOrm: await this.appService.testTypeOrm(1000) };
  }

  @Get('testSequelize')
  async testSequelize() {
    return await this.appService.testSequelize(10000);
  }
}
