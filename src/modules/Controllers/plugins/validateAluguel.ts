import { celebrate, Segments, Joi } from 'celebrate';

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    motoristasId: Joi.number().required(),
    automovelId: Joi.number().required(),
    motivoUtilizacao: Joi.string().required().messages({
      'string.empty': 'Motivo é obrigatório',
      'string.min': 'Motivo é obrigatório',
    }),
    dataInicio: Joi.date().required(),
  }),
});

const finalizar = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    motoristasId: Joi.string().required().messages({
      'string.empty': 'Id do motorista é obrigatório',
      'string.min': 'Id do motorista é obrigatório',
    }),
  }),
});

export default {
  create,
  finalizar,
};
