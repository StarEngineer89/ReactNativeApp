import api from 'src/api/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from './_actionNames';
import { navigationRef } from 'src/refs';
import { DrawerActions } from '@react-navigation/native';
import { anonymousLogin, anonymousLogOut, checkFirebaseAuth } from 'src/api/firebase';
import { AxiosError } from 'axios';
import { IAuthDispatch } from './_types';

const handleAuthError = (error: AxiosError) => {
  let payload = 'Network Error';

  if (error.response) {
    if (error.response.status === 400) {
      payload = error.response.data.errors[0].msg;
    } else {
      payload = error.response.data.message;
    }
  }

  return payload;
};

const __checkVersion = async () => {
  const __version = await AsyncStorage.getItem('APP_VERSION');

  if (__version !== 'MVP@V2_2') {
    const allKeys = await AsyncStorage.getAllKeys();

    await AsyncStorage.multiRemove(allKeys);
  }
};

const __checkShowOnBoaring = async () => {
  const status = await AsyncStorage.getItem('SHOW_TUTORIAL');

  if (!status) return true;

  return status !== '-1';
};

const signup = (dispatch: IAuthDispatch) => async (name: string, email: string, password: string) => {
  dispatch({ type: actions.LOADING_STARTED });

  try {
    const response = await api.post('/users/api/signup', {
      name,
      email,
      password,
    });
    await AsyncStorage.setItem('TOKEN', response.data.token);
    await AsyncStorage.setItem('APP_VERSION', 'MVP@V2_2');

    await anonymousLogin();

    dispatch({ type: actions.LOGIN_SUCCEEDED });
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const socialLogin = (dispatch: IAuthDispatch) => async (name: string, email: string, social: string, type: string, image: string) => {
  dispatch({ type: actions.LOADING_STARTED });

  try {
    const response = await api.post('/users/api/social-login', {
      name,
      email,
      social,
      type,
      image,
    });

    await AsyncStorage.setItem('TOKEN', response.data.token);
    await AsyncStorage.setItem('APP_VERSION', 'MVP@V2_2');

    await anonymousLogin();
    dispatch({ type: actions.LOGIN_SUCCEEDED });
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const login = (dispatch: IAuthDispatch) => async (email: string, password: string) => {
  try {
    const response = await api.post('/users/api/login', { email, password });

    await AsyncStorage.setItem('TOKEN', response.data.token);

    await AsyncStorage.setItem('APP_VERSION', 'MVP@V2_2');

    await anonymousLogin();

    dispatch({ type: actions.LOGIN_SUCCEEDED });
  } catch (error) {
    if (error.reponse && error.response.status === 401) {
      dispatch({
        type: 'UPDATE_ATTEMPTS',
        payload: error.response.data.attempts,
      });
    }

    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const resetPassword = (dispatch: IAuthDispatch) => async (email: string) => {
  try {
    await api.put('/users/api/reset-password', { email });
    dispatch({ type: actions.RESET_COMPLETED, payload: true });
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const autoSignIn = (dispatch: IAuthDispatch) => async () => {
  try {
    await __checkVersion();

    // await AsyncStorage.removeItem('SHOW_TUTORIAL');

    const showOnBoarding = await __checkShowOnBoaring();

    const token = await AsyncStorage.getItem('TOKEN');

    await checkFirebaseAuth(async (res: boolean) => {
      if (!res) {
        await anonymousLogin();
      }
    });

    let payload = { showOnBoarding, isLoggedIn: token != null };

    dispatch({ type: actions.AUTO_LOGIN, payload });
  } catch (error) {
    dispatch({ type: actions.SIGN_OUT });
  }
};

const signout = (dispatch: IAuthDispatch) => async () => {
  await AsyncStorage.removeItem('TOKEN');

  await anonymousLogOut();
  dispatch({ type: actions.SIGN_OUT });
};

const getProfiles = (dispatch: IAuthDispatch) => async () => {
  dispatch({ type: actions.GET_PROFILES_STARTED });

  try {
    const response = await api.get('/users/api/me');

    if (response.data.success) {
      setTimeout(() => {
        dispatch({
          type: actions.GET_PROFILES_SUCCEEDED,
          payload: response.data,
        });
      }, 500);
    } else {
      dispatch({ type: actions.GET_PROFILES_FAILED });
    }
  } catch (error) {
    if ((!error.reponse || error.response.status === 401) && error.message !== 'Network Error') {
      await AsyncStorage.removeItem('TOKEN');

      dispatch({ type: actions.SIGN_OUT });
    } else {
      dispatch({ type: actions.GET_PROFILES_FAILED });
    }
  }
};

const resendVerification = () => async () => {
  try {
    await api.put('/users/api/me/resend-verification');
  } catch (error) {}
};

const completeOnBoarding = (dispatch: IAuthDispatch) => async () => {
  try {
    await AsyncStorage.setItem('SHOW_TUTORIAL', '-1');

    dispatch({ type: actions.SET_ONBOARDING_STATUS, payload: false });
  } catch (error) {}
};

const clearError = (dispatch: IAuthDispatch) => () => {
  dispatch({ type: actions.CLEAR_ERROR });
};

const clearReset = (dispatch: IAuthDispatch) => () => {
  dispatch({ type: actions.RESET_CLEAR });
};

const selectProfile = (dispatch: IAuthDispatch) => profile => {
  dispatch({ type: actions.SELECT_PROFILE, payload: profile });
};

const changePassword = (dispatch: IAuthDispatch) => async (old: string, password: string) => {
  dispatch({ type: actions.LOADING_STARTED });

  try {
    const response = await api.put('/users/api/update-password', {
      old,
      password,
    });

    if (response.data.success) {
      setTimeout(async () => {
        await AsyncStorage.removeItem('TOKEN');
        dispatch({ type: actions.SIGN_OUT });
      }, 2000);
    } else {
    }
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const switchUser = (dispatch: IAuthDispatch) => () => {
  navigationRef.current.dispatch(DrawerActions.closeDrawer());

  setTimeout(() => {
    dispatch({ type: actions.SWITCH_USER });
  }, 500);
};

const deactivate = (dispatch: IAuthDispatch) => async () => {
  dispatch({ type: actions.LOADING_STARTED });
  try {
    await api.put('/users/api/deactivate');

    setTimeout(async () => {
      await AsyncStorage.removeItem('TOKEN');
      dispatch({ type: actions.SIGN_OUT });
    }, 2000);
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: handleAuthError(error) });
  }
};

const authActions = {
  signup,
  login,
  autoSignIn,
  signout,
  getProfiles,
  completeOnBoarding,
  clearError,
  selectProfile,
  changePassword,
  switchUser,
  deactivate,
  resetPassword,
  clearReset,
  socialLogin,
  resendVerification,
};

export default authActions;
