import { Dispatch } from 'react';
import { ClassRoom, IStudentCategory, IStudentRecording, Student } from 'src/entities';
import actions from './_actionNames';

export interface IPupilState {
  _id?: string;
  image?: string;
  name?: string;
  classroom: ClassRoom;
  loading: true;
  error: string | null;
  currentCategory: IStudentCategory;
}

export type IPupilReducerAction =
  | {
      type: actions.LOADING_STARTED | actions.ERROR | actions.CLEAR_ERROR | actions.CLEAR_CLASSROOM_CATEGORY | actions.CLEAR_STATE;
      payload?: {};
    }
  | {
      type: actions.RECORD_ITEM_LOCAL;
      payload: IStudentRecording;
    }
  | {
      type: actions.GET_CLASSROOM_CATEGORY;
      payload: IStudentCategory;
    }
  | {
      type: actions.GET_STUDENT;
      payload: Student;
    }
  | {
      type: actions.GET_CLASSROOM_CATEGORY;
      payload: IStudentCategory;
    };

export type IPupilDispatch = Dispatch<IPupilReducerAction>;
