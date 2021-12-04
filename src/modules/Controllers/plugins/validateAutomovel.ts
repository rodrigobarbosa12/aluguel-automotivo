import { celebrate, Segments, Joi } from 'celebrate';

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    placa: Joi.string().required().messages({
      'string.empty': 'Placa é obrigatória',
      'string.min': 'Placa é obrigatória',
    }),
    cor: Joi.string().required().messages({
      'string.empty': 'Qual a cor do veículo?',
      'string.min': 'Qual a cor do veículo?',
    }),
    marca: Joi.string().required().messages({
      'string.empty': 'Qual a Marca do veículo?',
      'string.min': 'Qual a Marca do veículo?',
    }),
  }),
});

const filtro = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    cor: Joi.string(),
    marca: Joi.string(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cor: Joi.string().required().messages({
      'string.empty': 'Qual a cor do veículo?',
      'string.min': 'Qual a cor do veículo?',
    }),
    marca: Joi.string().required().messages({
      'string.empty': 'Qual a Marca do veículo?',
      'string.min': 'Qual a Marca do veículo?',
    }),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().messages({
      'string.empty': 'Id do automóvel é obrigatório',
      'string.min': 'Id do automóvel é obrigatório',
    }),
  }),
});

const remove = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().messages({
      'string.empty': 'Id do automóvel é obrigatório',
      'string.min': 'Id do automóvel é obrigatório',
    }),
  }),
});

export default {
  create,
  filtro,
  update,
  remove,
};
