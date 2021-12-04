import { Request, Response } from 'express';
import service from '../Services/automovel';

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await service.create(req.body);
    return res.send({ message: 'Automóvel cadastrado!', automovel: result });
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
    return res.send({ message: 'Automóvel atualizado!' });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await service.remove(Number(id));
    return res.send({ message: 'Automóvel removido!' });
  } catch (error) {
    return res.status(error.code ? error.code : 400).json(error);
  }
};

export default {
  create,
  getList,
  update,
  remove,
};
