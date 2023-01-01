import createDataContext from '../createDataContext';
import authActions from './_authActions';
import { authReducer } from './_authReducer';
import { authInitialState } from './_initialState';
import { IAuthState } from './_types';

type IContext = { state: IAuthState } & { [key in keyof typeof authActions]: ReturnType<typeof authActions[key]> };
export const { Provider, Context } = createDataContext<IContext>(authReducer, authActions, authInitialState);
