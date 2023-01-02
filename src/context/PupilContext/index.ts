import createDataContext from '../createDataContext';
import { initialState } from './_initialState';
import _actions from './_actionNames';
import pupilActions from './_pupilActions';
import { pupilReducer } from './_pupilReducer';
import { IPupilState } from './_types';

type IContext = { state: IPupilState } & { [key in keyof typeof pupilActions]: ReturnType<typeof pupilActions[key]> };
export const { Provider, Context } = createDataContext<IContext>(pupilReducer, pupilActions, initialState);
