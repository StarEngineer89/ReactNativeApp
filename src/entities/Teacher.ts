export interface ITeacherCategory {
  id: string;
  _id: string;
  name?: string;
  image: string;
  parent?: string;
  sortOrder: number;
  predefined: boolean;
}

export interface ITeacherRecording {
  _id: string;
  category: string;
  voiceURL?: string;
  language: string;
  predefined: boolean;
}

interface Teacher {
  _id: string;
  account: string;
  name: string;
  image?: string;
  tutorials: {
    students: boolean;
    categories: boolean;
    classrooms: boolean;
  };
  languages: string[];
  categories: ITeacherCategory[];
  recordings: ITeacherRecording[];
  uploading: boolean;
}

export default Teacher;
