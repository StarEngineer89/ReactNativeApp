import createDataContext from '../createDataContext';
import { initialState } from './_initialState';
import _actions from './_actionNames';
import pupilActions from './_pupilActions';
import { pupilReducer } from './_pupilReducer';

export const { Provider, Context } = createDataContext(pupilReducer, pupilActions, initialState);
