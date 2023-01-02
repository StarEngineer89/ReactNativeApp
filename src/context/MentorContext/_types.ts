import { Dispatch } from 'react';
import { Category, ClassRoom, News, Student, StudentCategory, Teacher } from 'src/entities';
import actions from './_actionNames';

export interface IMentorState {
  profileInfo: Teacher;
  categories: Category[];
  students: Student[];
  classrooms: ClassRoom[];
  news: News[];
  savingStudent: {
    loading: boolean;
    error?: string;
  };
  savingSet: {
    loading: boolean;
    error?: string;
  };
  sendingMessage: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  tutorial: {
    students: boolean;
    categories: boolean;
  };
  savingProfile: {
    loading: boolean;
    error?: string;
  };
  customSets: Category[];
  studentCategory: {
    loading: boolean;
    error?: string;
    category: StudentCategory;
  };
  loading: boolean;
  error: string | null;
  currentCategory: Category[];
  currentDrawer: 'Home' | 'Profile';
}

export type IMentorReducerAction =
  | {
      type:
        | actions.SAVING_STUDENT_STARTED
        | actions.SAVING_SET_STARTED
        | actions.SAVING_STUDENT_CLEAR_ERROR
        | actions.SAVING_SET_CLEAR_ERROR
        | actions.LOADING_STARTED
        | actions.ERROR
        | actions.CLEAR_ERROR
        | actions.UPDATING_PROFILE
        | actions.UPDATING_PROFILE_ERROR
        | actions.UPDATING_PROFILE_ERROR_CLEAR
        | actions.EDITING_PROFILE_SUCCEEDED
        | actions.GETTING_STUDENT_CATEGORY
        | actions.GETTING_STUDENT_CATEGORY_FAILURE
        | actions.CLEAR_STUDENT_CATEGORY
        | actions.CLEAR_STATE
        | actions.CLEAR_CATEGORY_PROGRESS
        | actions.MESSAGE_SEND
        | actions.MESSAGE_SENT
        | actions.MESSAGE_ERROR
        | actions.MESSAGE_CLEAR;
      payload?: {};
    }
  | {
      type: actions.SAVING_STUDENT_ERROR | actions.SAVING_SET_ERROR;
      payload: {
        error: string;
      };
    }
  | {
      type: actions.GETTING_STUDENT_CATEGORY_SUCCESS | actions.GET_CATEGORY_PROGRESS;
      payload: Category;
    }
  | {
      type: actions.CREATE_STUDENT;
      payload: Student;
    }
  | {
      type: actions.GET_PROFILE_SUCCEEDED;
      payload: {
        teacher: Teacher;
        categories: Category[];
        students: Student[];
        news: News[];
        tutorials: {
          students: boolean;
          categories: boolean;
        };
      };
    }
  | {
      type: actions.RECORD_CATEGORY_ITEM_REMOTE;
      payload: Category;
    }
  | {
      type: actions.CONFIRM_TUTORIAL;
      payload: {
        students: boolean;
        categories: boolean;
      };
    }
  | {
      type: actions.RECORD_CATEGORY_ITEM_LOCAL;
      payload: {
        id: string;
        voiceURL: {
          uri: string;
        };
      };
    }
  | {
      type: actions.SET_DRAWER | actions.SAVING_STUDENT_ERROR | actions.SAVING_SET_ERROR;
      payload: string;
    }
  | {
      type: actions.EDITING_STUDENT_IMAGE | actions.EDITING_SET_ITEM_IMAGE | actions.EDITING_SET_IMAGE;
      payload:
        | {
            id: string;
            uploading: true;
          }
        | {
            id: string;
            image: string;
            upload: undefined | false;
          };
    }
  | {
      type: actions.ADDING_SET_ITEM;
      payload: Category;
    }
  | {
      type: actions.DELETE_SET_ITEM_SUCCEEDED | actions.DELETE_SET_SUCCEEDED | actions.DELETE_STUDENT_SUCCEEDED;
      payload: string;
    }
  | {
      type: actions.EDITING_PROFILE_IMAGE;
      payload: Partial<Teacher>;
    }
  | {
      type: actions.CREATE_SET;
      payload: Category;
    }
  | {
      type: actions.EDITING_STUDENT_SUCCEEDED;
      payload: Student;
    }
  | {
      type: actions.EDITING_SET_SUCCEEDED;
      payload: {
        id: string;
        name: string;
      };
    }
  | {
      type: actions.EDITING_SET_IMAGE;
      payload: {
        id: string;
        uploading: boolean;
      };
    }
  | {
      type: actions.RATING_VOICE_SUCCEEDED;
      payload: {
        childId: string;
        score: number;
      };
    };

export type IMentorDispatch = Dispatch<IMentorReducerAction>;
