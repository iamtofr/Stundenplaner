export const types = {
  LOGIN: 'APP/LOGIN',
  LOGOUT: 'APP/LOGOUT',
  SET_LECTURES: 'APP/SET_LECTURES',
};

export const actions = {
  login: data => ({ type: types.LOGIN, data }),
  logout: () => ({ type: types.LOGOUT }),
  setLectures: data => ({ type: types.SET_LECTURES, data }),
};

const initialState = {
  token: '',
  profile: {},
  isLoggedIn: false,
  lectures: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        token: action.data.token,
        profile: action.data.profile,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        token: '',
        profile: {},
        isLoggedIn: false,
      };
    case types.SET_LECTURES:
      console.log('setLectures: ');
      console.log(action.data.lectures);
      return {
        lectures: action.data,
      };
    default:
      return state;
  }
};
