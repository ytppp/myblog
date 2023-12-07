/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string;
  password: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  userId: string | number;
  username: string;
  email: string;
  permissions: string[];
}