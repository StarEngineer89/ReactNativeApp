import api from "src/api/server";
import actions from "./_actionNames";
import {
  cacheStudentCategoryVoices,
  cacheStudentNewVoice,
} from "src/helpers/downloader";
import { uploadToDirectory } from "src/api/firebase";

const getProfile = (dispatch) => async (id) => {
  dispatch({ type: actions.LOADING_STARTED });
  try {
    const response = await api.get(`/api/students/${id}`);
    dispatch({ type: actions.GET_STUDENT, payload: response.data.student });
  } catch (error) {
    dispatch({ type: actions.ERROR });
  }
};

const clearStudentState = (dispatch) => () => {
  dispatch({ type: actions.CLEAR_STATE });
};

const getCategory =
  (dispatch) => async (studentId, classroomId, categoryId, predefined) => {
    try {
      const response = await api.post(
        `/api/students/${studentId}/classrooms/${classroomId}/category/${categoryId}`,
        {
          predefined,
          language: "default",
        }
      );

      // dispatch({ type: actions.GET_CLASSROOM_CATEGORY, payload: response.data });

      let payload = await cacheStudentCategoryVoices(response.data.category);

      dispatch({ type: actions.GET_CLASSROOM_CATEGORY, payload });
    } catch (error) {}
  };

const clearCategory = (dispatch) => () => {
  dispatch({ type: actions.CLEAR_CLASSROOM_CATEGORY });
};

const recordVoice =
  (dispatch) =>
  async (id, childId, classroom, category, predefined, uri, oldVoice) => {
    try {
      dispatch({
        type: actions.RECORD_ITEM_LOCAL,
        payload: { id: childId, studentVoiceURL: { uri } },
      });

      const studentVoiceURL = await uploadToDirectory("voices", uri);

      const response = await api.put(
        `/api/students/${id}/record/${childId}/classroom/${classroom}`,
        {
          studentVoiceURL,
          predefined,
        }
      );

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
