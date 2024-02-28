import { Controller, Get } from '@nestjs/common';
import { NotificationEvents } from './notification.events';
import * as os from 'os';

@Controller('event')
export class EventController {
  constructor(private readonly notificationEvents: NotificationEvents) {}

  @Get('send')
  sendNotifications() {
    const length = 200000;
    console.log('Generando emails');
    const emails = Array.from(
      { length },
      (_, index) => `user${index + 1}@example.com`,
    );
    const start: any = new Date();
    console.log('Inicio proceso');

    // Obtener uso inicial de memoria y CPU
    const initialMemoryUsage = process.memoryUsage();
    const initialCpuUsage = process.cpuUsage();

    for (const email of emails) {
      this.notificationEvents.sendNotification(email);
    }

    // Obtener uso final de memoria y CPU
    const finalMemoryUsage = process.memoryUsage();
    const finalCpuUsage = process.cpuUsage();

    console.log('Finalizo proceso');
    const finish: any = new Date();

    // Calcular el tiempo transcurrido
    const timeMs = finish - start;

    // Calcular la memoria consumida (suma de todos los valores)
    const totalMemoryUsage =
      finalMemoryUsage.rss +
      finalMemoryUsage.heapTotal +
      finalMemoryUsage.heapUsed +
      finalMemoryUsage.external -
      (initialMemoryUsage.rss +
        initialMemoryUsage.heapTotal +
        initialMemoryUsage.heapUsed +
        initialMemoryUsage.external);

    const totalCpuUsage =
      finalCpuUsage.user +
      finalCpuUsage.system -
      (initialCpuUsage.user + initialCpuUsage.system);

    return {
      msj: `Se enviaron ${length.toLocaleString()} notificaciones`,
      timeMs,
      memoryUsage: this.formatBytes(totalMemoryUsage),
      cpuUsage: this.formatBytes(totalCpuUsage),
    };
  }
  formatBytes(bytes: number): string {
    const k = 1024;
    return (bytes / k).toFixed(2) + 'KB';
  }

  formatMicroseconds(microseconds: number): string {
    return (microseconds / 1000000).toFixed(2) + 'MB';
  }
}
