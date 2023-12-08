import postgresInstance from './Instance';

export const getData = (url) => postgresInstance.get(url);

export const setData = (url, data) => postgresInstance.post(url, data);

export const editData = (url, data) => postgresInstance.patch(url, data);

export const deleteData = (url) => postgresInstance.delete(url);

export const updatePermissionData = (id, data) =>
  postgresInstance.patch(`/permission/${id}`, data);
export const getPermissionsData = (id) =>
  postgresInstance.get(`/permission/${id}`);

export const getDesignationById = (id) =>
  postgresInstance.get(`/designations/${id}`);
export const setPermissionsData = () =>
  postgresInstance.get('/permission/profile');
// export const StripeDriverSignUp = (data) =>
//   postgresInstance.post('/auth/stripe', data);
