import mapper from '../Mapper/motorista';
import Motorista from '../../database/entity/Motoristas';
import { PesquisaQuery } from '../../@types';
import { ExceptionError } from '../../utils';

const create = async (params: Motorista): Promise<Motorista> => {
  const result = await mapper.create(params);

  return result;
};

const getList = async (params: PesquisaQuery): Promise<Motorista[]> => {
  const result = await mapper.getList(params);

  return result;
};

const update = async (id: number, params: Motorista): Promise<void> => {
  const motorista = await mapper.getPorId(id);

  if (!motorista) {
    throw ExceptionError('Motorista não encontrado na base de dados', 401);
  }

  await mapper.update(id, params);
};

const deletar = async (id: number): Promise<void> => {
  const motorista = await mapper.getPorId(id);

  if (!motorista) {
    throw ExceptionError('Motorista não encontrado na base de dados', 401);
  }

  await mapper.deletar(id);
};

export default {
  create,
  getList,
  update,
  deletar,
};
