import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/user/login',
  Logout = '/user/logout',
  GetUserInfo = '/user/getUserInfo',
  GetPermCode = '/user/getPermCode',
  TestRetry = '/testRetry',
  ChangePassword = '/user/password',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.post<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.post(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export function changePassword(oldPassword, newPassword) {
  return defHttp.post<null>({
    url: Api.ChangePassword,
    params: {
      oldPassword,
      newPassword,
    },
  });
}
