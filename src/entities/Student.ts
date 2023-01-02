import { StudentCategory } from './Category';
import ClassRoom from './Classroom';
import Recording from './Recording';

interface Student {
  _id: string;
  account: string;
  name: string;
  image?: string;
  categories: StudentCategory[];
  recordings: Recording[];
  uploading: boolean;
  classroom: ClassRoom;
}

export default Student;
