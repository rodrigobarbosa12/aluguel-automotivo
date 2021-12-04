import { Request, Response } from 'express';
import service from '../Services/motorista';

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await service.create(req.body);
    return res.send({ message: 'Motorista cadastrado!', Motorista: result });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const getList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await service.getList(req.query);
    return res.send(result);
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await service.update(Number(id), req.body);
    return res.send({ message: 'Motorista atualizado!' });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const deletar = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await service.deletar(Number(id));
    return res.send({ message: 'Motorista removido!' });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

export default {
  create,
  getList,
  update,
  deletar,
};
