import { DataSource } from 'typeorm';
import { dataSourceOptions } from './datasourceoptions';
export const connectionSource = new DataSource(dataSourceOptions);
