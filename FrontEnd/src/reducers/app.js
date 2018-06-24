export const types = {
  LOGIN: 'APP/LOGIN',
  LOGOUT: 'APP/LOGOUT',
  SET_LECTURES: 'APP/SET_LECTURES',
  SET_ACTIVE_TAB: 'APP/SET_ACTIVE_TAB',
  SHOW_LOADER: 'APP/SHOW_LOADER',
  HIDE_LOADER: 'APP/HIDE_LOADER',
};

export const actions = {
  login: data => ({ type: types.LOGIN, data }),
  logout: () => ({ type: types.LOGOUT }),
  setLectures: data => ({ type: types.SET_LECTURES, data }),
  setActiveTab: data => ({ type: types.SET_ACTIVE_TAB, data }),
  showLoader: () => ({ type: types.SHOW_LOADER }),
  hideLoader: () => ({ type: types.HIDE_LOADER }),
};

const initialState = {
  token: '',
  profile: {},
  isLoggedIn: false,
  lectures: [],
  activeTab: '',
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.data.token,
        profile: action.data.profile,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        token: '',
        profile: {},
        isLoggedIn: false,
      };
    case types.SET_LECTURES:
      return {
        ...state,
        lectures: action.data.lectures,
      };
    case types.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.data.activeTab,
      };
    case types.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case types.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
