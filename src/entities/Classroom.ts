import Student from './Student';
import Teacher from './Teacher';

interface ClassRoom {
  _id: string;
  account: string;
  teacher: Teacher;
  primary: boolean;
  mentor: string;
  owner: string;
  pupils: string[];
  name: string;
  image: string;
  students: string[];
  language: string;
  recorded: number;
  total: number;
  categories: {
    _id: string;
    categoryId: string;
    name: string;
    image: string;
    predefined: boolean;
    recorded: number;
    total: number;
    children: Student[];
  }[];
}

export default ClassRoom;
