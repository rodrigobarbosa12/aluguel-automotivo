import { getRepository, getManager } from 'typeorm';
import Automovel from '../../database/entity/Automovel';
import { ExceptionError } from '../../utils';
import { PesquisaQuery } from '../../@types';

const { NODE_ENV: dbName } = process.env;

const getPorId = (id: number): Promise<Automovel> => {
  const repository = getRepository(Automovel, dbName);

  const automovel = repository.findOne({ where: { id } });
  return automovel;
};

const create = async (params: Automovel): Promise<Automovel> => getManager(dbName)
  .transaction(async (transaction) => {
    const { placa, cor, marca } = params;

    const repository = transaction.getRepository(Automovel);

    const automovel = await repository.findOne({ where: { placa, cor, marca } });

    if (automovel) {
      throw ExceptionError('Automóvel já cadastrado!', 401);
    }

    const newAutomovel = repository.create({ placa, cor, marca });

    const result = await transaction.save(newAutomovel);

    return result;
  });

const getList = async (params: PesquisaQuery): Promise<Automovel[]> => {
  const { cor, marca } = params;

  const repository = getRepository(Automovel, dbName);

  const query = repository.createQueryBuilder();

  if (cor) {
    query.where('cor like :cor', { cor: `%${cor}%` });
  }

  if (marca) {
    query.where('marca like :marca', { marca: `%${marca}%` });
  }

  const automoveis = await query.getMany();

  return automoveis;
};

const update = async (id: number, data: Automovel) => {
  const repository = getRepository(Automovel, dbName);

  await repository
    .createQueryBuilder()
    .update(Automovel)
    .set(data)
    .where('id = :id', { id })
    .execute();
};

const remove = async (id: number): Promise<void> => {
  const repository = getRepository(Automovel, dbName);

  await repository.delete(id);
};

export default {
  create,
  getPorId,
  getList,
  update,
  remove,
};
