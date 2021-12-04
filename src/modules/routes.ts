import { Router } from 'express';
import validateMotorista from './Controllers/plugins/validateMotorista';
import validateAutomovel from './Controllers/plugins/validateAutomovel';
import validateAluguel from './Controllers/plugins/validateAluguel';
import motorista from './Controllers/motorista';
import automovel from './Controllers/automovel';
import aluguel from './Controllers/aluguel';

const routes = Router();

/**
 * MOTORISTA
 */
routes.post('/motorista', validateMotorista.create, motorista.create);
routes.get('/motorista', validateMotorista.filtro, motorista.getList);
routes.put('/motorista/:id', validateMotorista.update, motorista.update);
routes.delete('/motorista/:id', validateMotorista.remover, motorista.deletar);

/**
 * AUTOMÓVEL
 */
routes.post('/automovel', validateAutomovel.create, automovel.create);
routes.get('/automovel', validateAutomovel.filtro, automovel.getList);
routes.put('/automovel/:id', validateAutomovel.update, automovel.update);
routes.delete('/automovel/:id', validateAutomovel.remove, automovel.remove);

/**
 * ALUGUEL
 */
routes.post('/aluguel/cadastro', validateAluguel.create, aluguel.create);
routes.get('/aluguel/ativos', aluguel.getList);
routes.put('/aluguel/finalizar/:motoristasId', validateAluguel.finalizar, aluguel.update);

export default routes;
