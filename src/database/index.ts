import 'reflect-metadata';
import { createConnections } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { NODE_ENV } = process.env;

const patch = NODE_ENV === 'development'
  ? `${__dirname}/entity/*.ts`
  : `${__dirname}/entity/*.js`;


const connectToProduction = () => createConnections([{
  name: 'production',
  type: 'sqlite',
  database: 'src/database/production.sqlite',
  entities: [patch],
  namingStrategy: new SnakeNamingStrategy(),
}])
.then((connections) => {
  connections.forEach((connection) => {
    if (connection.isConnected) {
      console.log(`Banco ${connection.name} conectado!`);
    }
  });
})

export const connectToTest = async () => {
  const connections = await createConnections([{
    name: 'development',
    type: 'sqlite',
    database: 'src/database/development.sqlite',
    entities: [patch],
    namingStrategy: new SnakeNamingStrategy(),
  }]);

  connections.forEach((connection) => {
    if (connection.isConnected) {
      console.log(`Banco ${connection.name} conectado!`);
    }
  });

  return connections;
}
  
(() => NODE_ENV === 'production' ? connectToProduction() : connectToTest())();
