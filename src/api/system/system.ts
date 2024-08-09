import {
  AccountParams,
  DeptListItem,
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
  MenuList = '/menu/list',
  RolePageList = '/role/list',
  AddRole = '/role/create',
  EditRole = '/role/update/',
  DeleteRole = '/role/delete/',
  AddDept = '/dept/create',
  EditDept = '/dept/update/',
  DeleteDept = '/dept/delete/',
  AddUser = '/user/create',
  EditUser = '/user/update/',
  DeleteUser = '/user/delete/',
  AddMenu = '/menu/create',
  EditMenu = '/menu/update/',
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
          item.label = item.deptName;
          item.value = item.id;
          item.title = item.deptName;
          item.key = item.id;
          item.children = res.items.filter((child) => child.parentDept == item.id);
          if (item.children.length == 0) {
            delete item.children;
          }
        });
        if (!params || !params.query || (params.query && JSON.stringify(params.query) == '{}')) {
          res.items = res.items.filter((item) => !item.parentDept);
        }
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getMenuList = () => {
  return new Promise((resolve, reject) => {
    getMenuListTree()
      .then((res: any) => {
        resolve(res.items || []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMenuListTree = () => {
  return new Promise((resolve, reject) => {
    defHttp
      .post<MenuListGetResultModel>({
        url: Api.MenuList,
        params: {
          pageSize: 1000000,
          sortItem: 'orderNo',
          sortType: 'asc',
        },
      })
      .then((res) => {
        // 开始对数据进行处理
        res.items.forEach((item) => {
          item.label = item.menuName;
          item.value = item.id;
          item.title = item.menuName;
          item.key = item.id;
          item.children = res.items.filter((child) => child.parentMenu == item.id);
          if (item.children.length == 0) {
            delete item.children;
          }
        });
        res.items = res.items.filter((item) => !item.parentMenu);
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
      .post<any>({ url: Api.RolePageList, params })
      .then((res) => {
        resolve(res.items);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.EditRole + id, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const AddRole = (role: Recordable) => defHttp.post({ url: Api.AddRole, params: role });

export const EditRole = (role: Recordable) =>
  defHttp.post({ url: Api.EditRole + role.id, params: role });

export const DeleteRole = (id: number) => defHttp.post({ url: Api.DeleteRole + id });

export const AddDept = (dept: Recordable) => defHttp.post({ url: Api.AddDept, params: dept });

export const EditDept = (dept: Recordable) =>
  defHttp.post({ url: Api.EditDept + dept.id, params: dept });

export const DeleteDept = (id: number) => defHttp.post({ url: Api.DeleteDept + id });

export const AddUser = (user: Recordable) => defHttp.post({ url: Api.AddUser, params: user });

export const EditUser = (user: Recordable) =>
  defHttp.post({ url: Api.EditUser + user.id, params: user });

export const DeleteUser = (id: number) => defHttp.post({ url: Api.DeleteUser + id });

export const AddMenu = (menu: Recordable) => defHttp.post({ url: Api.AddMenu, params: menu });

export const EditMenu = (menu: Recordable) =>
  defHttp.post({ url: Api.EditMenu + menu.id, params: menu });

export const DeleteMenu = (id: number) => defHttp.post({ url: Api.DeleteMenu + id });

export const ResetPassword = (oldPassword: string, newPassword: string) =>
  defHttp.post({ url: Api.ResetPassword, params: { oldPassword, newPassword } });
