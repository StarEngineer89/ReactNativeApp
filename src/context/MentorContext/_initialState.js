export const initialState = {
  profileInfo: null,
  categories: [],
  students: [],
  classrooms: [],
  news: [],
  savingStudent: {
    loading: false,
    error: null,
  },
  savingSet: {
    loading: false,
    error: null,
  },
  sendingMessage: {
    loading: false,
    success: null,
    error: null,
  },
  tutorial: {
    students: false,
    categories: false,
  },
  savingProfile: {
    loading: false,
    error: null,
  },
  customSets: [],
  studentCategory: {
    loading: true,
    error: null,
    category: null,
  },
  loading: true,
  error: null,
  currentCategory: null,
  currentDrawer: "Home",
};
