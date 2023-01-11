import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { SendNotification } from './send-notification';

describe('Enviar Notificacao', () => {
  test('deve ser possivel enviar uma notificacao', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();

    const enviarNotificacao = new SendNotification(notificationsRepository);

    const { notification } = await enviarNotificacao.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    });
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
