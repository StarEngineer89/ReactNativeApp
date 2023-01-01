import ClassRoom from './Classroom';

export interface IStudentCategory {
  _id: string;
  name: string;
  image: string;
  predefined: boolean;
  children: any[];
  slug: string;
  recorded: number;
  total: number;
}

export interface IStudentRecording {
  _id: string;
  category: string;
  classroom: string;
  studentVoiceURL?: string;
  predefined: boolean;
  score: number;
}

interface Student {
  _id: string;
  account: string;
  name: string;
  image?: string;
  categories: IStudentCategory[];
  recordings: IStudentRecording[];
  uploading: boolean;
  classroom: ClassRoom;
}

export default Student;
