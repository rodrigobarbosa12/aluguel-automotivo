import { getRepository, getManager } from 'typeorm';
import Motorista from '../../database/entity/Motoristas';
import { ExceptionError } from '../../utils';
import { PesquisaQuery } from '../../@types';

const { NODE_ENV: dbName } = process.env;

const getPorId = (id: number): Promise<Motorista> => {
  const repository = getRepository(Motorista, dbName);

  const motorista = repository.findOne({ where: { id } });
  return motorista;
};

const create = async (params: Motorista): Promise<Motorista> => getManager(dbName)
  .transaction(async (transaction) => {
    const { nome } = params;

    const repository = transaction.getRepository(Motorista);

    const motorista = await repository.findOne({ where: { nome } });

    if (motorista) {
      throw ExceptionError('Motorista já cadastrado!', 401);
    }

    const newMotorista = repository.create(params);

    const result = await transaction.save(newMotorista);

    return result;
  });

const getList = async (params: PesquisaQuery): Promise<Motorista[]> => {
  const { nome } = params;

  const repository = getRepository(Motorista, dbName);

  const query = repository.createQueryBuilder();

  if (nome) {
    query.where('nome like :nome', { nome: `%${nome}%` });
  }

  const motoristas = await query.getMany();

  return motoristas;
};

const update = async (id: number, data: Motorista) => {
  const repository = getRepository(Motorista, dbName);

  await repository
    .createQueryBuilder()
    .update(Motorista)
    .set(data)
    .where('id = :id', { id })
    .execute();
};

const deletar = async (id: number): Promise<void> => {
  const repository = getRepository(Motorista, dbName);

  await repository.delete(id);
};

export default {
  create,
  getPorId,
  getList,
  update,
  deletar,
};
