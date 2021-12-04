import request from 'supertest';
import app from '../../app';
import { connectToTest } from '../../database'

describe('Testando rotas de aluguel', () => {
  beforeAll(async () => {
    await connectToTest();
  });

  it('deve impedir de alugar com motorista que não existe', async () => {
    const response = await request(app)
      .post('/aluguel/cadastro')
      .send({ 
        motoristasId: 1,
        automovelId: 1,
        motivoUtilizacao: 'Aluguel para viagem',
        dataInicio: '2021-12-01 12:15:00'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Motorista não encontrado na base de dados');
  });
});
