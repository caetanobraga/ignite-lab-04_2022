import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  test('deve retornar as notificacoes por recipientId', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade 2'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade 2'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-2',
    });

    expect(count).toEqual(1);
  });
});
