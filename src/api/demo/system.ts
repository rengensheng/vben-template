import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
} from './model/systemModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  AccountList = '/user/list',
  IsAccountExist = '/user/accountExist',
  DeptList = '/dept/list',
  setRoleStatus = '/role/setRoleStatus',
  MenuList = '/menu/list',
  RolePageList = '/role/list',
  GetAllRoleList = '/role/list',
  AddRole = '/role/add',
  EditRole = '/role/update',
  DeleteRole = '/role/delete/',
  AddDept = '/dept/add',
  EditDept = '/dept/update',
  DeleteDept = '/dept/delete/',
  AddUser = '/user/add',
  EditUser = '/user/update',
  DeleteUser = '/user/delete/',
  AddMenu = '/menu/add',
  EditMenu = '/menu/update',
  DeleteMenu = '/menu/delete/',
  ResetPassword = '/user/resetPassword',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) => {
  return new Promise((resolve, reject) => {
    getDeptListTree(params)
      .then((res: any) => {
        resolve(res.items || []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDeptListTree = (params?: DeptListItem) => {
  return new Promise((resolve, reject) => {
    defHttp
      .post<DeptListGetResultModel>({
        url: Api.DeptList,
        params,
      })
      .then((res) => {
        // 开始对数据进行处理
        res.items.forEach((item) => {
          item.label = item.dept_name;
          item.value = item.id;
          item.title = item.dept_name;
          item.key = item.id;
          item.children = res.items.filter((child) => child.parent_dept == item.id);
          if (item.children.length == 0) {
            delete item.children;
          }
        });
        res.items = res.items.filter((item) => !item.parent_dept);
        console.log('树结果', res);
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getMenuList = (params?: MenuParams) => {
  return new Promise((resolve, reject) => {
    getMenuListTree(params)
      .then((res: any) => {
        resolve(res.items || []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMenuListTree = (params?: MenuParams) => {
  return new Promise((resolve, reject) => {
    defHttp
      .post<MenuListGetResultModel>({
        url: Api.MenuList,
        params: {
          pageSize: 1000000,
          sortItem: 'order_no',
          sortType: 'asc',
        },
      })
      .then((res) => {
        // 开始对数据进行处理
        res.items.forEach((item) => {
          item.label = item.menu_name;
          item.value = item.id;
          item.title = item.menu_name;
          item.key = item.id;
          item.children = res.items.filter((child) => child.parent_menu == item.id);
          if (item.children.length == 0) {
            delete item.children;
          }
        });
        res.items = res.items.filter((item) => !item.parent_menu);
        console.log('树结果', res);
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: any) => {
  return new Promise((resolve, reject) => {
    params.pageSize = 99999;
    defHttp
      .post<any>({ url: Api.GetAllRoleList, params })
      .then((res) => {
        resolve(res.items);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const AddRole = (role: Recordable) => defHttp.post({ url: Api.AddRole, params: role });

export const EditRole = (role: Recordable) => defHttp.post({ url: Api.EditRole, params: role });

export const DeleteRole = (id: number) => defHttp.post({ url: Api.DeleteRole + id });

export const AddDept = (dept: Recordable) => defHttp.post({ url: Api.AddDept, params: dept });

export const EditDept = (dept: Recordable) => defHttp.post({ url: Api.EditDept, params: dept });

export const DeleteDept = (id: number) => defHttp.post({ url: Api.DeleteDept + id });

export const AddUser = (user: Recordable) => defHttp.post({ url: Api.AddUser, params: user });

export const EditUser = (user: Recordable) => defHttp.post({ url: Api.EditUser, params: user });

export const DeleteUser = (id: number) => defHttp.post({ url: Api.DeleteUser + id });

export const AddMenu = (menu: Recordable) => defHttp.post({ url: Api.AddMenu, params: menu });

export const EditMenu = (menu: Recordable) => defHttp.post({ url: Api.EditMenu, params: menu });

export const DeleteMenu = (id: number) => defHttp.post({ url: Api.DeleteMenu + id });

export const ResetPassword = (oldPassword: string, newPassword: string) =>
  defHttp.post({ url: Api.ResetPassword, params: { oldPassword, newPassword } });
