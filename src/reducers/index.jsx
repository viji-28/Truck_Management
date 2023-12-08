import { combineReducers } from 'redux';

// ===================================================================
// COMMON REDUCER

const initialStateCommon = {
  isOpen: false,
  successMessage: null,
  errorMessage: null,
  loader: false,
};
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};

// ===================================================================
// AUTH REDUCER

const initialStateAuth = {
  islogin: localStorage.getItem('accessTocken')
    ? localStorage.getItem('accessTocken')
    : null,
  role: '',
  permission: [],
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: localStorage.getItem('accessTocken'),
        role: action.payload,
        permission: action.permission,
      };
    case 'LOGOUT':
      return {
        ...state,
        role: null,
        permission: null,
      };
    default:
      return state;
  }
};

// functionality reducers
const initialStateFunction = {
  designation: [],
  bookingData: [],
  truckdata: [],
  trucksbranddata: [],
  permissions: [],
  designationSelected: [],
  designa: [],
  PermissionsSocket: [],
  trucksList: [],
  routeListing: [],
};
const functionReducer = (state = initialStateFunction, action) => {
  switch (action.type) {
    case 'ADMIN_DATA':
      return {
        ...state,
        designation: action.payload,
      };
    case 'SIGNUPDATA':
      return {
        ...state,
        bookingData: action.payload,
      };
    case 'TRUCKSDATA':
      return {
        ...state,
        truckdata: action.payload,
      };
    case 'TRUCKSBRANDDATA':
      return {
        ...state,
        trucksbranddata: action.payload,
      };
    case 'GET_PERMISSION': {
      return {
        ...state,
        permissions: action.payload,
      };
    }
    case 'GET_DESIGNATION_OF_PERMISSIONS':
      return {
        ...state,
        designationSelected: action.payload,
      };
    case 'DESIGN':
      return {
        ...state,
        designa: action.payload,
      };
    case 'PERMISSION_SOCKET_DATA': {
      return {
        ...state,
        PermissionsSocket: action.payload,
      };
    }
    case 'TRUCK_LIST': {
      return {
        ...state,
        trucksList: action.payload,
      };
    }
    case 'ROUTE_LIST': {
      return {
        ...state,
        routeListing: action.payload,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  commonReducer,
  authReducer,
  functionReducer,
});
