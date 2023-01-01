import api from 'src/api/server';
import actions from './_actionNames';
import { cacheStudentCategoryVoices } from 'src/helpers/downloader';
import { uploadToDirectory } from 'src/api/firebase';
import { IPupilDispatch } from './_types';

const getProfile = (dispatch: IPupilDispatch) => async (id: string) => {
  dispatch({ type: actions.LOADING_STARTED });
  try {
    const response = await api.get(`/api/students/${id}`);
    dispatch({ type: actions.GET_STUDENT, payload: response.data.student });
  } catch (error) {
    dispatch({ type: actions.ERROR });
  }
};

const clearStudentState = (dispatch: IPupilDispatch) => () => {
  dispatch({ type: actions.CLEAR_STATE });
};

const getCategory = (dispatch: IPupilDispatch) => async (studentId: string, classroomId: string, categoryId: string, predefined: boolean) => {
  try {
    const response = await api.post(`/api/students/${studentId}/classrooms/${classroomId}/category/${categoryId}`, {
      predefined,
      language: 'default',
    });

    // dispatch({ type: actions.GET_CLASSROOM_CATEGORY, payload: response.data });

    let payload = await cacheStudentCategoryVoices(response.data.category);

    dispatch({ type: actions.GET_CLASSROOM_CATEGORY, payload });
  } catch (error) {}
};

const clearCategory = (dispatch: IPupilDispatch) => () => {
  dispatch({ type: actions.CLEAR_CLASSROOM_CATEGORY });
};

const recordVoice =
  (dispatch: IPupilDispatch) => async (id: string, childId: string, classroom: string, category: string, predefined: boolean, uri: string) => {
    try {
      dispatch({
        type: actions.RECORD_ITEM_LOCAL,
        payload: { id: childId, studentVoiceURL: { uri } },
      });

      const studentVoiceURL = await uploadToDirectory('voices', uri);

      const response = await api.put(`/api/students/${id}/record/${childId}/classroom/${classroom}`, {
        studentVoiceURL,
        predefined,
      });

      if (response.data.status) {
        // 618d81e2da3a2952908df553
        dispatch({
          type: actions.UPDATE_CLASSROOM_PROGRESS,
          payload: category,
        });
      }
    } catch (error) {}
  };

export default {
  getProfile,
  clearStudentState,
  getCategory,
  clearCategory,
  recordVoice,
};
