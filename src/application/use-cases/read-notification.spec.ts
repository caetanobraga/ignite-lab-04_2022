import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { SendNotification } from './send-notification';

describe('Ler Notificacao', () => {
  test('deve ser possivel marcar como lida uma notificacao', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const enviarNotificacao = new SendNotification(notificationsRepository);
    const readNotification = new ReadNotification(notificationsRepository);

    const { notification } = await enviarNotificacao.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    await readNotification.execute({
      notificarionId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('não deve ser possivel marcar como lida uma notificacao que não existe', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const lerNotificacao = new ReadNotification(notificationsRepository);

    expect(() => {
      return lerNotificacao.execute({
        notificarionId: 'notification not existent',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
