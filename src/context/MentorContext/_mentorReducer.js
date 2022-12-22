import _actions from "./_actionNames";
import { initialState } from "./_initialState";

export const mentorReducer = (state, { type, payload }) => {
  switch (type) {
    case _actions.SAVING_STUDENT_STARTED:
      return {
        ...state,
        savingStudent: { ...state.savingStudent, loading: true },
      };
    case _actions.SAVING_STUDENT_ERROR:
      return {
        ...state,
        savingStudent: {
          loading: false,
          error: payload,
          uploading: undefined,
        },
      };

    case _actions.SAVING_SET_STARTED:
      return {
        ...state,
        savingSet: { ...state.savingSet, loading: true },
      };
    case _actions.SAVING_SET_ERROR:
      return {
        ...state,
        savingSet: {
          loading: false,
          error: payload,
          uploading: undefined,
        },
      };
    case _actions.SAVING_STUDENT_CLEAR_ERROR:
      return {
        ...state,
        savingStudent: { ...state.savingStudent, error: null },
      };

    case _actions.SAVING_SET_CLEAR_ERROR:
      return {
        ...state,
        savingSet: { ...state.savingSet, error: null },
      };

    case _actions.LOADING_STARTED:
      return { ...state, loading: true, error: null };

    case _actions.ERROR:
      return { ...state, loading: false, error: "Something Went Wrong" };

    case _actions.CLEAR_ERROR:
      return { ...state, error: null };

    case _actions.GET_PROFILE_SUCCEEDED:
      return {
        ...state,
        profileInfo: payload.teacher,
        categories: payload.categories.filter((c) => c.predefined === true),
        customSets: payload.categories.filter((c) => c.predefined === false),
        students: payload.students,
        news: payload.news,
        loading: false,
        error: null,
        tutorial: {
          students: payload.tutorials.students,
          categories: payload.tutorials.categories,
          // classrooms: payload.tutorials.classrooms,
        },
      };

    case "UPDATING_PROFILE":
      return {
        ...state,
        savingProfile: {
          ...state.savingProfile,
          loading: true,
        },
      };

    case "UPDATING_PROFILE_ERROR":
      return {
        ...state,
        savingProfile: {
          ...state.savingProfile,
          loading: false,
          error: "An Error occured",
        },
      };

    case "UPDATING_PROFILE_ERROR_CLEAR":
      return {
        ...state,
        savingProfile: {
          ...state.savingProfile,
          error: null,
        },
      };

    case _actions.EDITING_PROFILE_SUCCEEDED:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, name: payload },
        savingProfile: {
          ...state.savingProfile,
          loading: false,
        },
      };

    case _actions.EDITING_PROFILE_IMAGE:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, ...payload },
      };

    case "GETTING_STUDENT_CATEGORY":
      return {
        ...state,
        studentCategory: { ...state.studentCategory, loading: true },
      };

    case "GETTING_STUDENT_CATEGORY_SUCCESS":
      return {
        ...state,
        studentCategory: {
          ...state.studentCategory,
          loading: false,
          category: payload,
        },
      };

    case "GETTING_STUDENT_CATEGORY_FAILURE":
      return {
        ...state,
        studentCategory: {
          ...state.studentCategory,
          loading: false,
          error: "ERROR",
        },
      };

    case "CLEAR_STUDENT_CATEGORY":
      return {
        ...state,
        studentCategory: { loading: false, error: null, category: null },
      };

    case _actions.RATING_VOICE_SUCCEEDED:
      return {
        ...state,
        studentCategory: {
          ...state.studentCategory,
          category: {
            ...state.studentCategory.category,
            children: state.studentCategory.category.children.map((c) =>
              c._id === payload.childId ? { ...c, score: payload.score } : c
            ),
          },
        },
      };

    case _actions.CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, payload],
      };

    case _actions.CREATE_SET:
      return {
        ...state,
        customSets: [...state.customSets, payload],
      };
    case _actions.EDITING_STUDENT_SUCCEEDED:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === payload._id ? payload : student
        ),
        savingStudent: { ...state.savingStudent, loading: false },
      };

    case _actions.EDITING_SET_SUCCEEDED:
      return {
        ...state,
        customSets: state.customSets.map((set) =>
          set._id === payload.id ? { ...set, name: payload.name } : set
        ),
        savingSet: { ...state.savingSet, loading: false },
      };

    case _actions.EDITING_STUDENT_IMAGE:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === payload.id ? { ...student, ...payload } : student
        ),
      };

    case _actions.EDITING_SET_IMAGE:
      return {
        ...state,
        customSets: state.customSets.map((set) =>
          set._id === payload.id ? { ...set, ...payload } : set
        ),
      };

    case _actions.EDITING_SET_ITEM_IMAGE:
      return {
        ...state,
        currentCategory: state.currentCategory.map((set) =>
          set._id === payload.id ? { ...set, ...payload } : set
        ),
      };

    case _actions.DELETE_STUDENT_SUCCEEDED:
      return {
        ...state,
        students: state.students.filter((std) => std._id !== payload),
      };

    case _actions.DELETE_SET_SUCCEEDED:
      return {
        ...state,
        customSets: state.customSets.filter((c_set) => c_set._id !== payload),
      };

    case _actions.DELETE_SET_ITEM_SUCCEEDED:
      return {
        ...state,
        currentCategory: state.currentCategory.filter(
          (c_set) => c_set._id !== payload
        ),
      };

    case _actions.ADDING_SET_ITEM:
      return {
        ...state,
        currentCategory: [...state.currentCategory, payload],
      };
    case _actions.CLEAR_STATE:
      return initialState;

    case _actions.GET_CATEGORY_PROGRESS:
      return { ...state, currentCategory: payload };

    case _actions.CLEAR_CATEGORY_PROGRESS:
      return { ...state, currentCategory: null };

    case "MESSAGE_SEND":
      return {
        ...state,
        sendingMessage: { ...state.sendingMessage, loading: true },
      };

    case "MESSAGE_SENT":
      return {
        ...state,
        sendingMessage: {
          ...state.sendingMessage,
          loading: false,
          success: true,
        },
      };

    case "MESSAGE_ERROR":
      return {
        ...state,
        sendingMessage: {
          ...state.sendingMessage,
          loading: false,
          error: true,
        },
      };

    case "MESSAGE_CLEAR":
      return {
        ...state,
        sendingMessage: { loading: false, success: null, error: null },
      };

    case _actions.RECORD_CATEGORY_ITEM_LOCAL:
      return {
        ...state,
        currentCategory: state.currentCategory.map((category) =>
          category._id === payload.id
            ? { ...category, voiceURL: payload.voiceURL }
            : category
        ),
      };

    case _actions.RECORD_CATEGORY_ITEM_REMOTE:
      return {
        ...state,
        currentCategory: state.currentCategory.map((category) =>
          category._id === payload._id ? payload : category
        ),
      };

    case _actions.CONFIRM_TUTORIAL:
      return { ...state, tutorial: payload };

    case "set_drawer":
      return { ...state, currentDrawer: payload };

    default:
      return state;
  }
};
