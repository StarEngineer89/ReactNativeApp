import createDataContext from '../createDataContext';
import _actions from './_actionNames';
import { initialState } from './_initialState';
import mentorActions from './_mentorActions';
import { mentorReducer } from './_mentorReducer';
import { IMentorState } from './_types';

type IContext = { state: IMentorState } & { [key in keyof typeof mentorActions]: ReturnType<typeof mentorActions[key]> };
export const { Provider, Context } = createDataContext<IContext>(mentorReducer, mentorActions, initialState);
