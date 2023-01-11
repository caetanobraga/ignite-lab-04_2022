import { Content } from './content';

describe('Conteudo da notificacao', () => {
  test('deve ser possivel criar um conteudo de notificacao', () => {
    const content = new Content('Você recebeu uma solicitção de amizade');

    expect(content).toBeTruthy();
  });

  test('não deve ser possivel criar um conteudo de notificacao com menos de 5 caracteres', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  test('não deve ser possivel criar um conteudo de notificacao com mais de 240 caracteres', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
