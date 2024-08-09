/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface User {
  account: string;
  avatar: string;
  createdBy: string;
  createdTime: string;
  dept: string;
  email: string;
  id: string;
  loginId: string;
  nickname: string;
  phone: string;
  pwd: string;
  remark: string;
  revision: number;
  role: string;
  updatedBy: string;
  updatedTime: string;
  username: string;
  isDelete: number;
  status: number;
}
