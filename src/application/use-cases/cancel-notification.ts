import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificarionId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificarionId } = request;

    const notification = await this.notificationsRepository.findById(
      notificarionId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
