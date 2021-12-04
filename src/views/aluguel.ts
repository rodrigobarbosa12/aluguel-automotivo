import moment from 'moment';
import Utilizacao from '../database/entity/Utilizacao';

export interface ViewAluguel {
  nome: string;
  placa: string;
  cor: string;
  marca: string;
  dataInicio: string;
  dataTermino: string;
  motivoUtilizacao: string;
}

const render = (utiolizacao: Utilizacao[]) => utiolizacao.map((item) => ({
  nome: item.motoristas.nome,
  placa: item.automovel.placa,
  cor: item.automovel.cor,
  marca: item.automovel.marca,
  motivoUtilizacao: item.motivoUtilizacao,
  dataInicio: moment(item.dataInicio).format('DD/MM/YYYY H:mm:ss'),
  dataTermino: moment(item.dataTermino).format('DD/MM/YYYY H:mm:ss'),
}));

export default {
  render,
};
