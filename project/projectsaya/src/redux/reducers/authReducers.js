import { USER_LOGIN_SUCCESS, USER_LOGOUT, AUTH_LOGIN_ERROR, AUTH_REGISTER, AUTH_SYSTEM_ERROR, AUTH_REGISTER_ERROR } from "../actions/types";

const INITIAL_STATE = {
  id: "",
  username: "",
  password: "",
  email: "",
  status: "",
  token: "",
  loginerror: "",
  error: "",
  statusregister: false,
  loginstatus: false,
  role: '',
  totalharga: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      // console.log(action.payload);
      return { ...INITIAL_STATE, ...action.payload, loginstatus: true };

    case USER_LOGOUT:
      return { ...INITIAL_STATE };

    case AUTH_SYSTEM_ERROR:
      return { ...INITIAL_STATE, ...action.payload };

    case AUTH_REGISTER:
      return { ...INITIAL_STATE, ...action.payload, statusregister: true };

    case AUTH_REGISTER_ERROR:
      return { ...INITIAL_STATE, error: action.payload };

    case AUTH_LOGIN_ERROR:
      return { ...INITIAL_STATE, loginerror: action.payload };

    // case TOTAL_HARGA:
    //   console.log(action.payload);
    //   return { ...state, totalharga: action.payload }

    default:
      return state;
  }
};
