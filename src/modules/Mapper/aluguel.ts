import { getRepository, getManager } from 'typeorm';
import moment from 'moment';
import Utilizacao from '../../database/entity/Utilizacao';
import { ObjectGeneric } from '../../@types';

const { NODE_ENV: dbName } = process.env;

const getPorMotoristasId = (motoristasId: number): Promise<Utilizacao> => {
  const repository = getRepository(Utilizacao, dbName);

  const motorista = repository.findOne({ where: { motoristasId } });
  return motorista;
};

const create = async (params: Utilizacao): Promise<Utilizacao> => getManager(dbName)
  .transaction(async (transaction) => {
    const repository = transaction.getRepository(Utilizacao);

    const newMotorista = repository.create(params);

    return transaction.save(newMotorista);
  });

const verificarMotorista = async (motoristasId: number): Promise<Utilizacao> => {
  const repository = getRepository(Utilizacao, dbName);

  const result = await repository
    .createQueryBuilder()
    .where('motoristas_id = :motoristasId', { motoristasId })
    .andWhere('data_termino > :termino', { termino: moment().format('YYYY-MM-DD H:mm:ss') })
    .orWhere('data_termino is null')
    .getOne();

  return result;
};

const verificarAutomovel = async (automovelId: number): Promise<Utilizacao> => {
  const repository = getRepository(Utilizacao, dbName);

  const result = await repository
    .createQueryBuilder()
    .where('automovel_id = :automovelId', { automovelId })
    .andWhere('data_termino > :termino', { termino: moment().format('YYYY-MM-DD H:mm:ss') })
    .orWhere('data_termino is null')
    .getOne();

  return result;
};

const getList = async (): Promise<Utilizacao[]> => {
  const repository = getRepository(Utilizacao, dbName);

  const utilizacao = await repository
    .createQueryBuilder('utilizacao')
    .leftJoinAndSelect('utilizacao.motoristas', 'motoristas')
    .leftJoinAndSelect('utilizacao.automovel', 'automovel')
    .where('data_termino > :termino', { termino: moment().format('YYYY-MM-DD H:mm:ss') })
    .orWhere('data_termino is null')
    .getMany();

  return utilizacao;
};

const update = async (id: number, data: ObjectGeneric) => {
  const repository = getRepository(Utilizacao, dbName);

  await repository
    .createQueryBuilder()
    .update(Utilizacao)
    .set(data)
    .where('id = :id', { id })
    .execute();
};

export default {
  create,
  getPorMotoristasId,
  verificarMotorista,
  verificarAutomovel,
  getList,
  update,
};
