import createDataContext from '../createDataContext';
import _actions from './_actionNames';
import { initialState } from './_initialState';
import mentorActions from './_mentorActions';
import { mentorReducer } from './_mentorReducer';

export const { Provider, Context } = createDataContext(mentorReducer, mentorActions, initialState);
