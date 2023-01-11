import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Cancelar Notificacao', () => {
  test('deve ser possivel cancelar uma notificacao', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const enviarNotificacao = new SendNotification(notificationsRepository);
    const cancelarNotificacao = new CancelNotification(notificationsRepository);

    const { notification } = await enviarNotificacao.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    await cancelarNotificacao.execute({
      notificarionId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('não deve ser possivel cancelar uma notificacao quando ela não existir', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();
    const cancelarNotificacao = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelarNotificacao.execute({
        notificarionId: 'notification.id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
