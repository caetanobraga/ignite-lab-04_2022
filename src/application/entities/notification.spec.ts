import { Content } from './content';
import { Notification } from './notification';

describe('Notificacao', () => {
  test('deve ser possivel criar uma notificacao', () => {
    const notificacao = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificacao).toBeTruthy();
  });
});
