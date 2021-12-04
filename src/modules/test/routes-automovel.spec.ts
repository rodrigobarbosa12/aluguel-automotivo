import request from 'supertest';
import app from '../../app';
import { connectToTest } from '../../database'

describe('Testando rotas de automovel', () => {
  let automovelId = 1;

  beforeAll(async () => {
    await connectToTest();
  });

  it('deve ser possivel cadastrar um automovel', async () => {
    const response = await request(app)
      .post('/automovel')
      .send({
        placa: 'abc-1b34',
        cor: 'azul',
        marca: 'VW'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Automóvel cadastrado!');
  });

  it('deve impedir de cadastrar um automovel', async () => {
    const response = await request(app)
      .post('/automovel')
      .send({ 
        placa: 'abc-1b34',
        cor: 'azul',
        marca: 'VW'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Automóvel já cadastrado!');
  });

  it('Erro quando não informar uma placa', async () => {
    const response = await request(app)
      .post('/automovel')
      .send({ placa: '' });

      
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('validation');
    expect(response.body.validation.body.message).toStrictEqual('Placa é obrigatória');
  });

  it('deve exibir lista de automovel', async () => {
    const response = await request(app)
      .get('/automovel');

    automovelId = response.body[0].id;

    expect(response.status).toBe(200);
  });

  it('deve atualizar um automóvel', async () => {
    const response = await request(app)
      .put(`/automovel/${automovelId}`)
      .send({ cor: 'Vermelho', marca: 'Ford' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Automóvel atualizado!');
  });

  it('deve remover um automovel', async () => {
    const response = await request(app)
      .delete(`/automovel/${automovelId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toStrictEqual('Automóvel removido!');
  });
});
