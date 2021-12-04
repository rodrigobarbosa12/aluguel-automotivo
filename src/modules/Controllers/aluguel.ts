import { Request, Response } from 'express';
import service from '../Services/aluguel';

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await service.create(req.body);

    return res.send({ message: 'Veículo alugado!', dataInicio: result.dataInicio });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const getList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await service.getList();
    return res.send(result);
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { motoristasId } = req.params;

    await service.update(Number(motoristasId));
    return res.send({ message: 'Aluguel finalizado' });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

export default {
  create,
  getList,
  update,
};
