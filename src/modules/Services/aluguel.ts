import moment from 'moment';
import 'moment/locale/pt-br';
import mapper from '../Mapper/aluguel';
import mapperMotoristas from '../Mapper/motorista';
import mapperAutomovel from '../Mapper/automovel';
import Utilizacao from '../../database/entity/Utilizacao';
import { ExceptionError } from '../../utils';
import aluguel, { ViewAluguel } from '../../views/aluguel';

const motoristaExiste = async (motoristasId: number) => {
  const motorista = await mapperMotoristas.getPorId(motoristasId);

  if (!motorista) {
    throw ExceptionError('Motorista não encontrado na base de dados', 401);
  }
};

const automovelExiste = async (automovelId: number) => {
  const automovel = await mapperAutomovel.getPorId(automovelId);

  if (!automovel) {
    throw ExceptionError('Automóvel não encontrado na base de dados', 401);
  }
};

const create = async (params: Utilizacao): Promise<Utilizacao> => {
  const { automovelId, motoristasId } = params;

  await motoristaExiste(motoristasId);
  await automovelExiste(automovelId);

  const motorista = await mapper.verificarMotorista(motoristasId);

  if (motorista) {
    throw ExceptionError('Esse motorista já esta usando um veículo', 401);
  }

  const automovel = await mapper.verificarAutomovel(automovelId);

  if (automovel) {
    throw ExceptionError('Automovel não está disponível', 401);
  }

  const result = await mapper.create({ ...params, dataTermino: null });

  return result;
};

const getList = async (): Promise<ViewAluguel[]> => {
  const result = await mapper.getList();

  return aluguel.render(result);
};

const update = async (motoristasId: number): Promise<void> => {
  await motoristaExiste(motoristasId);

  const utilizacao = await mapper.getPorMotoristasId(motoristasId);

  if (!utilizacao) {
    throw ExceptionError('Motorista não possui um alugel ativo', 401);
  }

  await mapper.update(utilizacao.id, { dataTermino: moment().format('YYYY-MM-DD H:mm:ss') });
};

export default {
  create,
  getList,
  update,
};
