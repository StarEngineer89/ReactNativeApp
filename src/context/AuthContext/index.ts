import createDataContext from '../createDataContext';
import authActions from './_authActions';
import { authReducer } from './_authReducer';
import { authInitialState } from './_initialState';

export const { Provider, Context } = createDataContext(authReducer, authActions, authInitialState);
