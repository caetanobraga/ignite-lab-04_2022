import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificarionId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificarionId } = request;

    const notification = await this.notificationsRepository.findById(
      notificarionId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
