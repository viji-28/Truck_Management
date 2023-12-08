import {
  editData,
  getData,
  setData,
  deleteData,
  updatePermissionData,
  getPermissionsData,
  getDesignationById,
  setPermissionsData,
  // StripeDriverSignUp,
} from '../api/Service';
import history from '../history';
// ===================================================================
// COMMON ACTIONS

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  dispatch({
    type: 'LOADER_FALSE',
  });
};

// ===================================================================
// AUTH ACTIONS

// action for login
export const islogin = (loginData) => async (dispatch) => {
  console.log('loginData', loginData);
  let { data } = await setData('/auth/login', loginData);
  console.log('dastasibn', data);
  if (data.success) {
    localStorage.setItem('accessTocken', data?.data?.accessTocken);
    localStorage.setItem('Role', data?.data?.role);
    dispatch({
      type: 'IS_LOGIN',
      payload: data.data.role,
      permission: data.data.permission,
    });
    dispatch(setSuccessMessage('Login success'));

    history.push('/dashboard');
  } else {
    dispatch(setErrorMessage(data?.data?.message));
    history.push('/');
  }
};

export const signUp = (Formdata, navigate) => async (dispatch) => {
  let { data } = await setData('auth/signup', Formdata);
  console.log('dataSignUp', data);
  dispatch({
    type: 'SIGNUPDATA',
    payload: Formdata,
  });
  window.open(data.message);
  // navigate('/payment_details');
};

// export const setProfile = () => async (dispatch) => {
//   let tocken = localStorage.getItem('accessTocken');
//   let { data } = await setData('/permission/profile', { accessTocken: tocken });
//   // console.log(data);
//   dispatch({
//     type: 'IS_LOGIN',
//     permission: data.data.permission,
//     payload: data.data.role,
//   });
// };

export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('accessTocken');
  let { data } = await setPermissionsData();
  console.log('dataProfile', data.data.permission);
  dispatch({
    type: 'PERMISSION_SOCKET_DATA',
    payload: data.data.permission,
    // payload: data.data.role,
  });
};

export const setPermission = (role, data) => async (dispatch) => {
  // console.log(role, data.role);
  if (role === data.role) {
    console.log('first');
    dispatch({
      type: 'IS_LOGIN',
      permission: data.data,
      payload: role,
    });
  }
};

// action for logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('accessTocken');
  //   Cookies.remove('accessTocken');
  dispatch({
    type: 'LOGOUT',
  });
  history.push('/');
};

export const Designation = () => async (dispatch) => {
  let { data } = await getData('/designations');
  console.log('designatgiomndata', data);
  dispatch({ type: 'ADMIN_DATA', payload: data.data });
};

export const stripePayment =
  (id, bookingData, navigate) => async (dispatch) => {
    console.log('bookingData@@', bookingData);
    let { data } = setData('/auth/payment', { bookingData, id });
    console.log('data', data);

    if (data.success) {
      navigate('/dashboard');

      dispatch(setSuccessMessage('Payment Successfull'));
      window.open(data.data.next_action.use_stripe_sdk.stripe_js);
    } else {
      dispatch(setErrorMessage(data.msg));
    }
  };

export const Payment = (data, id) => async (dispatch) => {
  let { data } = await setData('/auth/payment', { bookingData, id });
  console.log('dataPayment', data);
};

export const TrucksListing = () => async (dispatch) => {
  console.log('dfgdigd');
  dispatch(loaderTrue());
  let { data } = await getData('/trucksList/');
  dispatch({
    type: 'TRUCKSDATA',
    payload: data.data,
  });
  dispatch(loaderFalse());
  console.log('data', data);
};

export const truckBrandData = (brand) => async (dispatch) => {
  console.log('dfgdigd', brand);
  let { data } = await setData('/trucksList/', { brand });
  dispatch({
    type: 'TRUCKSBRANDDATA',
    payload: data.data,
  });
  console.log('truckBrandData', data);
};

export const truckSubmit = (truckdata) => async (dispatch) => {
  console.log('truckdata', truckdata);
  let { data } = await setData('/trucksList/trucks', truckdata);
  if (data.success === true) {
    dispatch(setSuccessMessage('Truck created  Successfull'));
  } else {
    dispatch(setErrorMessage(data.msg));
  }
  history.push('/truckList');

  console.log('truckSubmit', data);
};

export const routeSubmit = (routeData) => async (dispatch) => {
  console.log('truckdata', routeData);
  let { data } = await setData('/route', routeData);
  if (data.success === true) {
    dispatch(setSuccessMessage('Route created  Successfull'));
  } else {
    dispatch(setErrorMessage(data.msg));
  }

  console.log('truckSubmit', data);
};

export const getPermission = (id) => async (dispatch) => {
  await getPermissionsData(id).then((e) => {
    dispatch({
      type: 'GET_PERMISSION',
      payload: e.data.data,
    });
    dispatch({
      type: 'GET_DESIGNATION_OF_PERMISSIONS',
      payload: e.data.datas,
    });
  });
};

export const updatePermission = (id, updateData) => async (dispatch) => {
  let { data } = await updatePermissionData(id, updateData);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getPermissionsById = (id) => async (dispatch) => {
  await service.getPermissionById(id).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'PERMISSION_BY_ID',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const editById = (id) => async (dispatch) => {
  await getDesignationById(id).then((e) => {
    console.log('getDesignationById', e);
    dispatch({
      type: 'DESIGN',
      payload: e.data,
    });
  });
};

export const Permissionsockets = (data) => async (dispatch) => {
  // console.log('Permissionsockets', data);
  dispatch({
    type: 'PERMISSION_SOCKET_DATA',
    payload: data,
  });
};

export const Trucklisting = () => async (dispatch) => {
  let { data } = await getData('/trucksList/list');
  console.log('dataTruckList', data);
  dispatch({
    type: 'TRUCK_LIST',
    payload: data.data,
  });
};

export const ContactUs = (ContactData) => async (dispatch) => {
  let { data } = await setData('/contactus', ContactData);
  console.log('ContactUs', data);
};

export const AdminDriverSignUp = (ContactData) => async (dispatch) => {
  console.log('ContactData', [...ContactData]);
  let { data } = await setData('/adminDriver/create', ContactData);
  console.log('ContactUs', data);
  window.open(data.data);
};

export const DriverStripe = (StripeData) => async (dispatch) => {
  console.log('dataDriverStripe', StripeData);
  let { data } = await setData('/auth/stripe', StripeData);
  console.log('StripeDataDriverdfgdgdfg', data);
  history.push('/driverDetails');
  window.open(data.data);
};

export const RouteListing = () => async (dispatch) => {
  let { data } = await getData('/route');
  console.log('dataRouteList', data);
  dispatch({
    type: 'ROUTE_LIST',
    payload: data.data,
  });
};
