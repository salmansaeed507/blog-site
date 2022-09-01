import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

//local connection credentials
let dataSourceOptions: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: parseInt(process.env.ORM_PORT),
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/migrations/*.ts'],
};

//production connection crednetials
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  dataSourceOptions = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    url: dbUrl,
    logging: false,
    synchronize: false,
    name: 'default',
    ssl: true,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
  };
}

export { dataSourceOptions };
