import mapper from '../Mapper/automovel';
import Automovel from '../../database/entity/Automovel';
import { PesquisaQuery } from '../../@types';
import { ExceptionError } from '../../utils';

const create = async (params: Automovel): Promise<Automovel> => {
  const result = await mapper.create(params);

  return result;
};

const getList = async (params: PesquisaQuery): Promise<Automovel[]> => {
  const result = await mapper.getList(params);

  return result;
};

const update = async (id: number, params: Automovel): Promise<void> => {
  const automovel = await mapper.getPorId(id);

  if (!automovel) {
    throw ExceptionError('Automóvel não encontrado na base de dados', 401);
  }

  await mapper.update(id, params);
};

const remove = async (id: number): Promise<void> => {
  const automovel = await mapper.getPorId(id);

  if (!automovel) {
    throw ExceptionError('Automóvel não encontrado na base de dados', 401);
  }

  await mapper.remove(id);
};

export default {
  create,
  getList,
  update,
  remove,
};
