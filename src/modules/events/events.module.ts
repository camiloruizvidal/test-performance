import { Module } from '@nestjs/common';
import { NotificationEvents } from './event/notification.events';
import { EventController } from './event/event.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [NotificationEvents],
  controllers: [EventController],
})
export class EventsModule {}
