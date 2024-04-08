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
  dept_name?: string;
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
  created_time: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  order_no: string;
  created_time: string;
  remark: string;
  status: number;
  dept_name: string;
  parent_dept: string;
  children?: DeptListItem[];
  label: string;
  value: string;
  title: string;
  key: string;
  query?: Recordable;
}

export interface MenuListItem {
  id: string;
  order_no: string;
  created_time: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
  menu_name: string;
  label?: string;
  value?: string;
  title?: string;
  key?: string;
  parent_menu?: string;
  children?: MenuListItem[];
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  order_no: string;
  created_time: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
