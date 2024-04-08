import { defHttp } from '@/utils/http/axios';
import { GeneratorTableInfo } from './model/generatorModel';

enum Api {
  GENERATOR_LIST = '/generator/list',
  GENERATOR_WEB = '/generator/web',
  GENERATOR_BACKEND = '/generator/backend',
}

export const getTableList = () => defHttp.post<GeneratorTableInfo>({ url: Api.GENERATOR_LIST });

export const generateWeb = (tableNames: string[]) =>
  defHttp.post<void>({
    url: Api.GENERATOR_WEB,
    params: {
      tables: tableNames,
    },
  });

export const generateBack = (tableNames: string[]) =>
  defHttp.post<void>({
    url: Api.GENERATOR_BACKEND,
    params: {
      tables: tableNames,
    },
  });
