import actions from './_actionNames';
import { authInitialState } from './_initialState';
import { IAuthReducerActions, IAuthState } from './_types';

export const authReducer = (state: IAuthState, { type, payload }: IAuthReducerActions) => {
  switch (type) {
    case actions.LOADING_STARTED:
      return { ...state, loading: true };

    case actions.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload || 'Something Went Wrong!',
      };

    case actions.CLEAR_ERROR:
      return { ...state, error: null };

    case actions.LOGIN_SUCCEEDED:
      return { ...state, loading: false, isLoggedIn: true, loginAttempts: 0 };

    case actions.SIGN_OUT:
      return authInitialState;

    case actions.SET_ONBOARDING_STATUS:
      return { ...state, showOnBoarding: payload };

    case actions.AUTO_LOGIN:
      return {
        ...state,
        loading: false,
        isLoggedIn: payload.isLoggedIn,
        showOnBoarding: payload.showOnBoarding,
      };

    case actions.SELECT_PROFILE:
      return {
        ...state,
        authId: payload.id,
        authType: payload.type,
        loading: false,
      };

    case actions.INITIAL_SELECT_PROFILE:
      return {
        ...state,
        authId: payload.id,
        authType: payload.type,
        loading: false,
        showOnBoarding: false,
      };

    case actions.GET_PROFILES_STARTED:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          loading: true,
          error: null,
        },
      };
    case actions.GET_PROFILES_SUCCEEDED:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          loading: false,
          data: payload.profiles,
        },
        accountType: payload.user.authType,
        verified: payload.user.verified,
      };

    case actions.GET_PROFILES_FAILED:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          loading: false,
          error: 'Something Went Wrong!',
        },
      };

    case actions.SWITCH_USER:
      return {
        ...state,
        authId: null,
        authType: null,
      };

    case actions.UPDATE_ATTEMPTS:
      return {
        ...state,
        loginAttempts: payload,
      };

    case actions.RESET_COMPLETED:
      return {
        ...state,
        reset: {
          completed: true,
        },
      };

    case actions.RESET_CLEAR:
      return {
        ...state,
        reset: {
          completed: false,
        },
      };

    default:
      return state;
  }
};
