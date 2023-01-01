import actions from './_actionNames';
import { initialState } from './_initialState';
import { IPupilReducerAction, IPupilState } from './_types';

export const pupilReducer = (state: IPupilState, { type, payload }: IPupilReducerAction) => {
  switch (type) {
    case actions.LOADING_STARTED:
      return { ...state, loading: true };

    case actions.ERROR:
      return { ...state, error: 'Something Went Wrong', loading: false };

    case actions.CLEAR_ERROR:
      return { ...state, error: null };

    case actions.GET_STUDENT:
      return {
        ...state,
        _id: payload._id,
        image: payload.image,
        name: payload.name,
        classroom: payload.classroom,
        loading: false,
        error: null,
      };

    case actions.GET_CLASSROOM_CATEGORY:
      return { ...state, currentCategory: payload };

    case actions.CLEAR_CLASSROOM_CATEGORY:
      return { ...state, currentCategory: null };

    case actions.RECORD_ITEM_LOCAL:
      return {
        ...state,
        currentCategory: {
          ...state.currentCategory,
          children: state.currentCategory.children.map(category =>
            category._id === payload.id ? { ...category, studentVoiceURL: payload.studentVoiceURL } : category,
          ),
        },
      };

    case actions.RECORD_ITEM_REMOTE:
      return {
        ...state,
        currentCategory: {
          ...state.currentCategory,
          children: state.currentCategory.children.map(category =>
            category._id === payload.id ? { ...category, studentVoiceURL: payload.studentVoiceURL } : category,
          ),
        },
      };

    case actions.UPDATE_CLASSROOM_PROGRESS:
      let ___category = state.classroom.categories.find(cat => cat._id === payload);
      ___category.recorded = ___category.recorded + 1;
      return {
        ...state,
        classroom: {
          ...state.classroom,
          categories: state.classroom.categories.map(cat => (cat._id === payload ? ___category : cat)),
        },
      };

    case actions.CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
};
