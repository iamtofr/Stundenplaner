export const types = {
  LOGIN: 'APP/LOGIN',
  LOGOUT: 'APP/LOGOUT',
};

export const actions = {
  login: data => ({ type: types.LOGIN, data }),
  logout: () => ({ type: types.LOGOUT }),
};

const initialState = {
  token: '',
  profile: {},
  isLoggedIn: false,
};
4;
export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      console.log('login');
      return {
        token: action.data.token,
        profile: action.data.profile,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      console.log('logout');
      return {
        token: '',
        profile: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
