import { http } from "@/utils/http";
import { GetUserInfoModel, LoginParams, LoginResultModel } from "./model/user";
import { ErrorMessageMode } from "@/constants/http";

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function login(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return http.post<LoginResultModel>(
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
  return http.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function logout() {
  return http.get({ url: Api.Logout });
}
