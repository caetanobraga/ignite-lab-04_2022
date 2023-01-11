import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { ImMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count recipients notifications', () => {
  test('deve retornar as notificacoes por recipientId', async () => {
    const notificationsRepository = new ImMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
