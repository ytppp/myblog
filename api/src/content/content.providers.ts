import { Content } from './content.pg.entity';

export const ContentProviders = [
  {
    provide: 'Content_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Content),
    inject: ['PG_DATA_SOURCE'],
  },
];