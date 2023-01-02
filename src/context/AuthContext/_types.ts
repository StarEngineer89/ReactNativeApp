import { Dispatch } from 'react';
import { ILoginResponse } from 'src/api/interfaces';
import { User } from 'src/entities';
import actions from './_actionNames';

export interface IAuthState {
  authId: string;
  authType: number;
  accountType: 'email';
  verified: boolean;
  showOnBoarding: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  profiles: {
    loading: boolean;
    error: string | null;
    data: User[];
  };
  reset: {
    completed: boolean;
  };
  loginAttempts: number;
}

export type IAuthReducerActions =
  | {
      type:
        | actions.LOADING_STARTED
        | actions.CLEAR_ERROR
        | actions.LOGIN_SUCCEEDED
        | actions.SIGN_OUT
        | actions.SWITCH_USER
        | actions.RESET_CLEAR
        | actions.GET_PROFILES_STARTED
        | actions.GET_PROFILES_FAILED
        | actions.RESET_COMPLETED;
      payload?: {};
    }
  | {
      type: actions.AUTH_ERROR;
      payload: string;
    }
  | {
      type: actions.SET_ONBOARDING_STATUS;
      payload: boolean;
    }
  | {
      type: actions.AUTO_LOGIN;
      payload: {
        isLoggedIn: boolean;
        showOnBoarding: boolean;
      };
    }
  | {
      type: actions.SELECT_PROFILE;
      payload: {
        id: string;
        type: number;
      };
    }
  | {
      type: actions.INITIAL_SELECT_PROFILE;
      payload: {
        id: string;
        type: number;
      };
    }
  | {
      type: actions.GET_PROFILES_STARTED | actions.GET_PROFILES_FAILED;
      payload: {
        profiles: User[];
      };
    }
  | {
      type: actions.GET_PROFILES_SUCCEEDED;
      payload: ILoginResponse;
    }
  | {
      type: actions.UPDATE_ATTEMPTS;
      payload: number;
    };

export type IAuthDispatch = Dispatch<IAuthReducerActions>;
export type IAuthReducer = (state: IAuthState, action: IAuthReducerActions) => IAuthState;
