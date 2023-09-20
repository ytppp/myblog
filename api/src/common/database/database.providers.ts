import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index'
const path = require('path');

const databaseType: DataSourceOptions['type'] = 'postgres';
const { dev_database_config } = getConfig()

const DATABASE_CONFIG = {
  ...dev_database_config,
  type: databaseType,
  entities: [path.join(__dirname, `../../**/*.${dev_database_config.entities}.entity{.ts,.js}`)],
}
console.log(DATABASE_CONFIG)
const DATA_SOURCE = new DataSource(DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'PG_DATA_SOURCE',
    useFactory: async () => {
      await DATA_SOURCE.initialize()
      return DATA_SOURCE
    }
  }
];