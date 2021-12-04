import { celebrate, Segments, Joi } from 'celebrate';

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome é obrigatório',
    }),
  }),
});

const filtro = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    nome: Joi.string(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome é obrigatório',
    }),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().messages({
      'string.empty': 'Id do motorista é obrigatório',
      'string.min': 'Id do motorista é obrigatório',
    }),
  }),
});

const remover = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().messages({
      'string.empty': 'Id do motorista é obrigatório',
      'string.min': 'Id do motorista é obrigatório',
    }),
  }),
});

export default {
  create,
  filtro,
  update,
  remover,
};
