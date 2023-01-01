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
  categories: {
    categoryId: string;
    name: string;
    image: string;
    predefined: boolean;
    total: number;
    children: Student[];
  }[];
}

export default ClassRoom;
