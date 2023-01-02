import { SETS, STUDENTS } from 'src/constants/routes';
import { uploadToDirectory } from 'src/api/firebase';
import api from 'src/api/server';
import { STORAGE } from 'src/constants';
import { cacheCategoryVoices, cacheStudentCategoryVoices } from 'src/helpers/downloader';
import { navigateBack, navigationRef } from 'src/refs';
import actions from './_actionNames';
import { IMentorDispatch } from './_types';
import { Category } from 'src/entities';

const getProfile = (dispatch: IMentorDispatch) => async () => {
  try {
    const response = await api.get('/api/teachers/me');
    if (response.data.success) {
      dispatch({
        type: actions.GET_PROFILE_SUCCEEDED,
        payload: response.data.profile,
      });
    } else {
      dispatch({ type: actions.ERROR });
    }
  } catch (error) {
    dispatch({ type: actions.ERROR });
  }
};

const getStudentClassroomCategory =
  (dispatch: IMentorDispatch) => async (studentId: string, classroomId: string, categoryId: string, predefined: boolean) => {
    dispatch({ type: actions.GETTING_STUDENT_CATEGORY });

    try {
      const response = await api.post(`/api/students/${studentId}/classrooms/${classroomId}/category/${categoryId}`, {
        predefined,
        language: 'default',
      });

      let payload: any = await cacheStudentCategoryVoices(response.data.category);
      dispatch({ type: actions.GETTING_STUDENT_CATEGORY_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: actions.GETTING_STUDENT_CATEGORY_FAILURE });
    }
  };

const updateTeacher = (dispatch: IMentorDispatch) => async (name: string, image: string, isImageNew: boolean) => {
  dispatch({ type: actions.UPDATING_PROFILE });
  try {
    await api.put('/api/teachers/me', { name });
    dispatch({ type: actions.EDITING_PROFILE_SUCCEEDED, payload: name });

    navigateBack();

    if (isImageNew) {
      dispatch({
        type: actions.EDITING_PROFILE_IMAGE,
        payload: { uploading: true },
      });
      const url = await uploadToDirectory(STORAGE.profiles, image);

      await api.put('/api/teachers/me/update-image', { image: url });

      dispatch({
        type: actions.EDITING_PROFILE_IMAGE,
        payload: { image: url, uploading: undefined },
      });
    }
  } catch (error) {
    dispatch({ type: actions.UPDATING_PROFILE_ERROR });
  }
};

const sendMessage = (dispatch: IMentorDispatch) => async (subject: string, body: string) => {
  dispatch({ type: actions.MESSAGE_SEND });
  try {
    await api.post(`/users/api/send-ticket`, { subject, body });
    dispatch({ type: actions.MESSAGE_SENT });
  } catch (error) {
    dispatch({ type: actions.MESSAGE_ERROR });
  }
};

const clearMessage = (dispatch: IMentorDispatch) => () => {
  dispatch({ type: actions.MESSAGE_CLEAR });
};

const clearError =
  (dispatch: IMentorDispatch) =>
  (key = 'GENERAL') => {
    switch (key) {
      case 'STUDENT':
        dispatch({ type: actions.SAVING_STUDENT_CLEAR_ERROR });
        break;
      case 'SET':
        dispatch({ type: actions.SAVING_SET_CLEAR_ERROR });
        break;
      case 'PROFILE':
        dispatch({ type: actions.UPDATING_PROFILE_ERROR_CLEAR });
        break;
      default:
        dispatch({ type: actions.CLEAR_ERROR });
        break;
    }
  };

const clearStudentClassroomCategory = (dispatch: IMentorDispatch) => () => {
  dispatch({ type: actions.CLEAR_STUDENT_CATEGORY });
};

const rateVoice = (dispatch: IMentorDispatch) => async (studentId: string, childId: string, cId: string, score: number) => {
  try {
    await api.put(`/api/students/${studentId}/rate/${childId}/classroom/${cId}`, { score });
    dispatch({
      type: actions.RATING_VOICE_SUCCEEDED,
      payload: { childId, score },
    });
  } catch (error) {}
};

const addStudent = (dispatch: IMentorDispatch) => async () => {
  try {
    const response = await api.post('/api/students');

    if (response.data.success) {
      dispatch({
        type: actions.CREATE_STUDENT,
        payload: response.data.student,
      });

      setTimeout(
        () =>
          navigationRef.current.navigate(STUDENTS.MAIN, {
            screen: STUDENTS.EDIT,
            params: { id: response.data.student._id },
          }),
        500,
      );
    }
  } catch (error) {
    console.log("Couldn't be completed");
  }
};

const editStudent = (dispatch: IMentorDispatch) => async (id: string, name: string, categories: Category[], image: string, isNewImage: boolean) => {
  dispatch({ type: actions.SAVING_STUDENT_STARTED });
  try {
    const response = await api.put(`/api/students/${id}`, {
      name,
      categories,
    });
    dispatch({
      type: actions.EDITING_STUDENT_SUCCEEDED,
      payload: response.data.student,
    });

    navigateBack();

    if (isNewImage) {
      dispatch({
        type: actions.EDITING_STUDENT_IMAGE,
        payload: { id, uploading: true },
      });

      const url = await uploadToDirectory(STORAGE.profiles, image);

      await api.put(`/api/students/${id}/update-image`, { image: url });

      dispatch({
        type: actions.EDITING_STUDENT_IMAGE,
        payload: { id, image: url, uploading: undefined },
      });
    }
  } catch (error) {
    let payload = 'Network Error';

    if (error.response) {
      if (error.response.status === 400) {
        payload = error.response.data.errors[0].msg;
      } else {
        payload = error.response.data.message;
      }
    }

    dispatch({
      type: actions.SAVING_STUDENT_ERROR,
      payload,
    });
  }
};

const deleteStudent = (dispatch: IMentorDispatch) => async (id: string) => {
  try {
    await api.delete(`/api/students/${id}`);

    dispatch({ type: actions.DELETE_STUDENT_SUCCEEDED, payload: id });
  } catch (error) {}
};

const clearState = (dispatch: IMentorDispatch) => () => {
  dispatch({ type: actions.CLEAR_STATE });
};

const getCategory = (dispatch: IMentorDispatch) => async (id: string, predefined: boolean) => {
  try {
    const response = await api.get(`/api/teachers/me/category/${id}/${predefined}`);

    let payload: any = await cacheCategoryVoices(response.data.category);

    dispatch({ type: actions.GET_CATEGORY_PROGRESS, payload });
  } catch (error) {}
};

const clearCategory = (dispatch: IMentorDispatch) => () => {
  dispatch({ type: actions.CLEAR_CATEGORY_PROGRESS });
};

// _ is a variable used in place of oldVoice argument but since it wasn't being used, i replaced it with _ for the time being
const recordMentorVoice = (dispatch: IMentorDispatch) => async (catId: string, uri: string, _: string, predefined: boolean) => {
  try {
    dispatch({
      type: actions.RECORD_CATEGORY_ITEM_LOCAL,
      payload: { id: catId, voiceURL: { uri } },
    });

    const voiceURL = await uploadToDirectory('voices', uri);

    await api.put(`/api/teachers/me/record/${catId}`, {
      voiceURL,
      predefined,
    });

    // const payload = await cacheNewVoice(response.data.record, oldVoice);

    // dispatch({ type: actions.RECORD_CATEGORY_ITEM_REMOTE, payload });
  } catch (error) {
    // console.log(error);
  }
};

const confirmTutorial = (dispatch: IMentorDispatch) => async (students: boolean, categories: boolean) => {
  try {
    const response = await api.put('/api/teachers/me/tutorials', {
      students,
      categories,
    });

    if (response.data.success) {
      dispatch({
        type: actions.CONFIRM_TUTORIAL,
        payload: { students, categories },
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

const setDrawerItem = (dispatch: IMentorDispatch) => (item: string) => {
  dispatch({ type: actions.SET_DRAWER, payload: item });
};

const addSet = (dispatch: IMentorDispatch) => async () => {
  try {
    const response = await api.post('/api/teachers/me/category');

    if (response.data.success) {
      dispatch({ type: actions.CREATE_SET, payload: response.data.category });
      setTimeout(
        () =>
          navigationRef.current.navigate(SETS.MAIN, {
            screen: SETS.EDIT,
            params: { id: response.data.category._id },
          }),
        500,
      );
    }
  } catch (error) {
    console.log("Couldn't be completed");
  }
};

const editSet = (dispatch: IMentorDispatch) => async (id: string, name: string, image: string, isNewImage: boolean) => {
  dispatch({ type: actions.SAVING_SET_STARTED });
  try {
    const response = await api.put(`/api/teachers/me/category/${id}`, {
      name,
    });
    if (response.data.success) {
      dispatch({
        type: actions.EDITING_SET_SUCCEEDED,
        payload: { id, name },
      });

      navigateBack();

      if (isNewImage) {
        dispatch({
          type: actions.EDITING_SET_IMAGE,
          payload: { id, uploading: true },
        });

        const url = await uploadToDirectory(STORAGE.sets, image);

        await api.put(`/api/teachers/me/category/${id}/update-image`, {
          image: url,
        });

        dispatch({
          type: actions.EDITING_SET_IMAGE,
          payload: { id, image: url, uploading: undefined },
        });
      }
    }
  } catch (error) {
    let payload = 'Network Error';

    if (error.response) {
      if (error.response.status === 400) {
        payload = error.response.data.errors[0].msg;
      } else {
        payload = error.response.data.message;
      }
    }

    dispatch({
      type: actions.SAVING_SET_ERROR,
      payload,
    });
  }
};

const addSetItem = (dispatch: IMentorDispatch) => async (id: string, image: string) => {
  try {
    const response = await api.post(`/api/teachers/me/category/${id}`);
    if (response.data.success) {
      let newItem = response.data.categoryItem;
      dispatch({
        type: actions.ADDING_SET_ITEM,
        payload: newItem,
      });

      dispatch({
        type: actions.EDITING_SET_ITEM_IMAGE,
        payload: { id: newItem._id, uploading: true },
      });

      const url = await uploadToDirectory(STORAGE.sets, image);

      await api.put(`/api/teachers/me/category/${newItem._id}/update-image`, {
        image: url,
      });

      dispatch({
        type: actions.EDITING_SET_ITEM_IMAGE,
        payload: {
          id: newItem._id,
          image: url,
          uploading: undefined,
        },
      });
    }
  } catch (error) {}
};

const deleteSet = (dispatch: IMentorDispatch) => async (id: string) => {
  try {
    await api.delete(`/api/teachers/me/category/${id}`);

    dispatch({ type: actions.DELETE_SET_SUCCEEDED, payload: id });
  } catch (error) {}
};

const deleteSetItem = (dispatch: IMentorDispatch) => async (id: string) => {
  try {
    await api.delete(`/api/teachers/me/category/${id}`);

    dispatch({ type: actions.DELETE_SET_ITEM_SUCCEEDED, payload: id });
  } catch (error) {}
};

const mentorActions = {
  getProfile,
  updateTeacher,

  sendMessage,
  clearMessage,

  clearError,
  clearState,

  getStudentClassroomCategory,
  clearStudentClassroomCategory,
  rateVoice,

  addStudent,
  editStudent,
  deleteStudent,

  addSet,
  editSet,
  deleteSet,
  addSetItem,
  deleteSetItem,

  getCategory,
  clearCategory,
  recordMentorVoice,

  confirmTutorial,
  setDrawerItem,
};

export default mentorActions;
