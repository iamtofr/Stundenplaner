export const types = {
  LOGIN: 'APP/LOGIN',
  LOGOUT: 'APP/LOGOUT',
  SET_LECTURES: 'APP/SET_LECTURES',
  SET_ACTIVE_TAB: 'APP/SET_ACTIVE_TAB',
};

export const actions = {
  login: data => ({ type: types.LOGIN, data }),
  logout: () => ({ type: types.LOGOUT }),
  setLectures: data => ({ type: types.SET_LECTURES, data }),
  setActiveTab: data => ({ type: types.SET_ACTIVE_TAB, data }),
};

const initialState = {
  token: '',
  profile: {},
  isLoggedIn: false,
  lectures: [],
  activeTab: '',
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
        ...state,
        lectures: action.data.lectures,
      };
    case types.SET_ACTIVE_TAB:
      console.log(action.data.activeTab);
      return {
        ...state,
        activeTab: action.data.activeTab,
      };
    default:
      return state;
  }
};
