import { Dispatch } from 'react';
import { Category, ClassRoom, Student, StudentCategory } from 'src/entities';
import actions from './_actionNames';

export interface IPupilState {
  _id?: string;
  image?: string;
  name?: string;
  classroom: ClassRoom;
  loading: true;
  error: string | null;
  currentCategory: StudentCategory;
}

export type IPupilReducerAction =
  | {
      type: actions.LOADING_STARTED | actions.ERROR | actions.CLEAR_ERROR | actions.CLEAR_CLASSROOM_CATEGORY | actions.CLEAR_STATE;
      payload?: {};
    }
  | {
      type: actions.RECORD_ITEM_LOCAL | actions.RECORD_ITEM_REMOTE;
      payload: {
        id: string;
        studentVoiceURL: {
          uri: string;
        };
      };
    }
  | {
      type: actions.GET_CLASSROOM_CATEGORY;
      payload: Category;
    }
  | {
      type: actions.GET_STUDENT;
      payload: Student;
    }
  | {
      type: actions.UPDATE_CLASSROOM_PROGRESS;
      payload: string;
    }
  | {
      type: actions.GET_CLASSROOM_CATEGORY;
      payload: Category;
    };

export type IPupilDispatch = Dispatch<IPupilReducerAction>;
