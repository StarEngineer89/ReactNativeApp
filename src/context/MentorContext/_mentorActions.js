import { SETS, STUDENTS } from "src/constants/routes";
import { uploadToDirectory } from "src/api/firebase";
import api from "src/api/server";
import { STORAGE } from "src/constants";
import {
  cacheCategoryVoices,
  cacheNewVoice,
  cacheStudentCategoryVoices,
} from "src/helpers/downloader";
import { navigateBack, navigationRef } from "src/refs";
import _actions from "./_actionNames";

const getProfile = (dispatch) => async () => {
  try {
    const response = await api.get("/api/teachers/me");
    if (response.data.success) {
      dispatch({
        type: _actions.GET_PROFILE_SUCCEEDED,
        payload: response.data.profile,
      });
    } else {
      dispatch({ type: _actions.ERROR });
    }
  } catch (error) {
    dispatch({ type: _actions.ERROR });
  }
};

const getStudentClassroomCategory =
  (dispatch) => async (studentId, classroomId, categoryId, predefined) => {
    dispatch({ type: "GETTING_STUDENT_CATEGORY" });

    try {
      const response = await api.post(
        `/api/students/${studentId}/classrooms/${classroomId}/category/${categoryId}`,
        {
          predefined,
          language: "default",
        }
      );

      let payload = await cacheStudentCategoryVoices(response.data.category);
      dispatch({ type: "GETTING_STUDENT_CATEGORY_SUCCESS", payload });
    } catch (error) {
      dispatch({ type: "GETTING_STUDENT_CATEGORY_FAILURE" });
    }
  };

const updateTeacher = (dispatch) => async (name, image, isImageNew) => {
  dispatch({ type: "UPDATING_PROFILE" });
  try {
    await api.put("/api/teachers/me", { name });
    dispatch({ type: _actions.EDITING_PROFILE_SUCCEEDED, payload: name });

    navigateBack();

    if (isImageNew) {
      dispatch({
        type: _actions.EDITING_PROFILE_IMAGE,
        payload: { uploading: true },
      });
      const url = await uploadToDirectory(STORAGE.profiles, image);

      await api.put("/api/teachers/me/update-image", { image: url });

      dispatch({
        type: _actions.EDITING_PROFILE_IMAGE,
        payload: { image: url, uploading: undefined },
      });
    }
  } catch (error) {
    dispatch({ type: "UPDATING_PROFILE_ERROR" });
  }
};

const sendMessage = (dispatch) => async (subject, body) => {
  dispatch({ type: "MESSAGE_SEND" });
  try {
    await api.post(`/users/api/send-ticket`, { subject, body });
    dispatch({ type: "MESSAGE_SENT" });
  } catch (error) {
    dispatch({ type: "MESSAGE_ERROR" });
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "MESSAGE_CLEAR" });
};

const clearError =
  (dispatch) =>
  (key = "GENERAL") => {
    switch (key) {
      case "STUDENT":
        dispatch({ type: _actions.SAVING_STUDENT_CLEAR_ERROR });
        break;
      case "SET":
        dispatch({ type: _actions.SAVING_SET_CLEAR_ERROR });
        break;
      case "PROFILE":
        dispatch({ type: "UPDATING_PROFILE_ERROR_CLEAR" });
        break;
      default:
        dispatch({ type: _actions.CLEAR_ERROR });
        break;
    }
  };

const clearStudentClassroomCategory = (dispatch) => () => {
  dispatch({ type: "CLEAR_STUDENT_CATEGORY" });
};

const rateVoice = (dispatch) => async (studentId, childId, cId, score) => {
  try {
    const response = await api.put(
      `/api/students/${studentId}/rate/${childId}/classroom/${cId}`,
      { score }
    );
    dispatch({
      type: _actions.RATING_VOICE_SUCCEEDED,
      payload: { childId, score },
    });
  } catch (error) {}
};

const addStudent = (dispatch) => async () => {
  try {
    const response = await api.post("/api/students");

    if (response.data.success) {
      dispatch({
        type: _actions.CREATE_STUDENT,
        payload: response.data.student,
      });

      setTimeout(
        () =>
          navigationRef.current.navigate(STUDENTS.MAIN, {
            screen: STUDENTS.EDIT,
            params: { id: response.data.student._id },
          }),
        500
      );
    }
  } catch (error) {
    console.log("Couldn't be completed");
  }
};

const editStudent =
  (dispatch) => async (id, name, categories, image, isNewImage) => {
    dispatch({ type: _actions.SAVING_STUDENT_STARTED });
    try {
      const response = await api.put(`/api/students/${id}`, {
        name,
        categories,
      });
      dispatch({
        type: _actions.EDITING_STUDENT_SUCCEEDED,
        payload: response.data.student,
      });

      navigateBack();

      if (isNewImage) {
        dispatch({
          type: _actions.EDITING_STUDENT_IMAGE,
          payload: { id, uploading: true },
        });

        const url = await uploadToDirectory(STORAGE.profiles, image);

        await api.put(`/api/students/${id}/update-image`, { image: url });

        dispatch({
          type: _actions.EDITING_STUDENT_IMAGE,
          payload: { id, image: url, uploading: undefined },
        });
      }
    } catch (error) {
      let payload = "Network Error";

      if (error.response) {
        if (error.response.status === 400) {
          payload = error.response.data.errors[0].msg;
        } else {
          payload = error.response.data.message;
        }
      }

      dispatch({
        type: _actions.SAVING_STUDENT_ERROR,
        payload,
      });
    }
  };

const deleteStudent = (dispatch) => async (id) => {
  try {
    await api.delete(`/api/students/${id}`);

    dispatch({ type: _actions.DELETE_STUDENT_SUCCEEDED, payload: id });
  } catch (error) {}
};

const clearState = (dispatch) => () => {
  dispatch({ type: _actions.CLEAR_STATE });
};

const getCategory = (dispatch) => async (id, predefined) => {
  try {
    const response = await api.get(
      `/api/teachers/me/category/${id}/${predefined}`
    );

    let payload = await cacheCategoryVoices(response.data.category);

    dispatch({ type: _actions.GET_CATEGORY_PROGRESS, payload });
  } catch (error) {}
};

const clearCategory = (dispatch) => () => {
  dispatch({ type: _actions.CLEAR_CATEGORY_PROGRESS });
};

const recordMentorVoice =
  (dispatch) => async (catId, uri, oldVoice, predefined) => {
    try {
      dispatch({
        type: _actions.RECORD_CATEGORY_ITEM_LOCAL,
        payload: { id: catId, voiceURL: { uri } },
      });

      const voiceURL = await uploadToDirectory("voices", uri);

      const response = await api.put(`/api/teachers/me/record/${catId}`, {
        voiceURL,
        predefined,
      });

      // const payload = await cacheNewVoice(response.data.record, oldVoice);

      // dispatch({ type: _actions.RECORD_CATEGORY_ITEM_REMOTE, payload });
    } catch (error) {
      // console.log(error);
    }
  };

const confirmTutorial = (dispatch) => async (students, categories) => {
  try {
    const response = await api.put("/api/teachers/me/tutorials", {
      students,
      categories,
    });

    if (response.data.success) {
      dispatch({
        type: _actions.CONFIRM_TUTORIAL,
        payload: { students, categories },
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

const setDrawerItem = (dispatch) => (item) => {
  dispatch({ type: "set_drawer", payload: item });
};

const addSet = (dispatch) => async () => {
  try {
    const response = await api.post("/api/teachers/me/category");

    if (response.data.success) {
      dispatch({ type: _actions.CREATE_SET, payload: response.data.category });
      setTimeout(
        () =>
          navigationRef.current.navigate(SETS.MAIN, {
            screen: SETS.EDIT,
            params: { id: response.data.category._id },
          }),
        500
      );
    }
  } catch (error) {
    console.log("Couldn't be completed");
  }
};

const editSet = (dispatch) => async (id, name, image, isNewImage) => {
  dispatch({ type: _actions.SAVING_SET_STARTED });
  try {
    const response = await api.put(`/api/teachers/me/category/${id}`, {
      name,
    });
    if (response.data.success) {
      dispatch({
        type: _actions.EDITING_SET_SUCCEEDED,
        payload: { id, name },
      });

      navigateBack();

      if (isNewImage) {
        dispatch({
          type: _actions.EDITING_SET_IMAGE,
          payload: { id, uploading: true },
        });

        const url = await uploadToDirectory(STORAGE.sets, image);

        await api.put(`/api/teachers/me/category/${id}/update-image`, {
          image: url,
        });

        dispatch({
          type: _actions.EDITING_SET_IMAGE,
          payload: { id, image: url, uploading: undefined },
        });
      }
    }
  } catch (error) {
    let payload = "Network Error";

    if (error.response) {
      if (error.response.status === 400) {
        payload = error.response.data.errors[0].msg;
      } else {
        payload = error.response.data.message;
      }
    }

    dispatch({
      type: _actions.SAVING_SET_ERROR,
      payload,
    });
  }
};

const addSetItem = (dispatch) => async (id, image) => {
  try {
    const response = await api.post(`/api/teachers/me/category/${id}`);
    if (response.data.success) {
      let newItem = response.data.categoryItem;
      dispatch({
        type: _actions.ADDING_SET_ITEM,
        payload: newItem,
      });

      dispatch({
        type: _actions.EDITING_SET_ITEM_IMAGE,
        payload: { id: newItem._id, uploading: true },
      });

      const url = await uploadToDirectory(STORAGE.sets, image);

      await api.put(`/api/teachers/me/category/${newItem._id}/update-image`, {
        image: url,
      });

      dispatch({
        type: _actions.EDITING_SET_ITEM_IMAGE,
        payload: {
          id: newItem._id,
          image: url,
          uploading: undefined,
        },
      });
    }
  } catch (error) {}
};

const deleteSet = (dispatch) => async (id) => {
  try {
    await api.delete(`/api/teachers/me/category/${id}`);

    dispatch({ type: _actions.DELETE_SET_SUCCEEDED, payload: id });
  } catch (error) {}
};

const deleteSetItem = (dispatch) => async (id) => {
  try {
    await api.delete(`/api/teachers/me/category/${id}`);

    dispatch({ type: _actions.DELETE_SET_ITEM_SUCCEEDED, payload: id });
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
