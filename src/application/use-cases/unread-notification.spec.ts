import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { SendNotification } from './send-notification';
import { UnreadNotification } from './unread-notification';

describe('Marcar Notificacao como não lida', () => {
  test('deve ser possivel marcar como não lida uma notificacao', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const enviarNotificacao = new SendNotification(notificationsRepository);
    const readNotification = new ReadNotification(notificationsRepository);
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const { notification } = await enviarNotificacao.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    });
    await readNotification.execute({
      notificarionId: notification.id,
    });

    await unreadNotification.execute({
      notificarionId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  test('não deve ser possivel marcar como lida uma notificacao que não existe', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificarionId: 'notification not existent',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
