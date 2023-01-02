import Category from './Category';
import Recording from './Recording';

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
  categories: Category[];
  recordings: Recording[];
  uploading: boolean;
}

export default Teacher;
