import request from 'supertest';
import app from '../../app';
import { connectToTest } from '../../database'

describe('Testando rotas de motoristas', () => {
  let motoristasId = 1;

  beforeAll(async () => {
    await connectToTest();
  });

  it('deve ser possivel cadastrar um motorista', async () => {
    const response = await request(app)
      .post('/motorista')
      .send({ nome: 'Rodrigo Barbosa' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Motorista cadastrado!');
  });

  it('deve impedir de cadastrar um motorista', async () => {
    const response = await request(app)
      .post('/motorista')
      .send({ nome: 'Rodrigo Barbosa' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Motorista já cadastrado!');
  });

  it('Erro quando não informar um nome', async () => {
    const response = await request(app)
      .post('/motorista')
      .send({ nome: '' });

      
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('validation');
    expect(response.body.validation.body.message).toStrictEqual('Nome é obrigatório');
  });

  it('deve exibir lista de motorista', async () => {
    const response = await request(app)
      .get('/motorista');

    motoristasId = response.body[0].id;

    expect(response.status).toBe(200);
  });

  it('deve atualizar um motorista', async () => {
    const response = await request(app)
      .put(`/motorista/${motoristasId}`)
      .send({ nome: 'Rodrigo Barbosa da Silva' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Motorista atualizado!');
  });

  it('deve remover um motorista', async () => {
    const response = await request(app)
      .delete(`/motorista/${motoristasId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Motorista removido!');
  });
});
