import { IAuthState } from './_types';

export const authInitialState: IAuthState = {
  authId: null,
  authType: null,
  accountType: null,
  verified: true,
  showOnBoarding: false,
  isLoggedIn: false,
  loading: false,
  error: null,
  profiles: {
    loading: false,
    error: null,
    data: [],
  },
  reset: {
    completed: false,
  },
  loginAttempts: 0,
};
