import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createdTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createdTime: string;
  remark: string;
  status: number;
  deptName: string;
  parentDept: string;
  children?: DeptListItem[];
  label: string;
  value: string;
  title: string;
  key: string;
  query?: Recordable;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createdTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
  menuName: string;
  label?: string;
  value?: string;
  title?: string;
  key?: string;
  parentMenu?: string;
  children?: MenuListItem[];
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createdTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
