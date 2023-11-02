import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Boletim } from '../models/Boletim';
import { Documents } from '../models/Documents';
import { TypeDocuments } from '../models/TypeDocuments';
import { Bloco } from '../models/Bloco';
import { Classificacao } from '../models/Classificação';
import { Camada } from '../models/camada';
import { Arquivo } from '../models/Arquivo';

require('dotenv').config();

//import { CreateUsuarios1656685284937 } from '../database/migrations/1656685284937-CreateUsuarios';

export const APPDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Boletim, Documents,  TypeDocuments, Bloco, Classificacao, Camada, Arquivo],
  //  migrations: [CreateUsuarios1656685284937],
  subscribers: [],
});