import { Injectable } from '@nestjs/common';

import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationEvents {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async sendNotification(email: string): Promise<void> {
    this.eventEmitter.emitAsync('notification.sent', email);
  }

  @OnEvent('notification.sent')
  handleResponse(email: string): void {
    // console.log(`Respuesta recibida para ${email}`);
  }
}
