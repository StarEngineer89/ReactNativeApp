import { Category, News, Profile, Student, Teacher, User } from 'src/entities';

export interface ILoginResponse {
  profiles: Profile[];
  success: boolean;
  user: User;
  token?: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}

export interface IGetStudentProfileResponse extends IResponse {
  student: Student;
}

export interface IGetStudentCategoryResponse extends IResponse {
  category: Category;
}

export interface IGetTeacherProfileResponse extends IResponse {
  profile: {
    teacher: Teacher;
    categories: Category[];
    students: Student[];
    news: News[];
    tutorials: {
      students: boolean;
      categories: boolean;
    };
  };
}

export interface IPostTeacherAddSetResponse extends IResponse {
  category: Category;
}

export interface IPostTeacherAddSetItemResponse extends IResponse {
  categoryItem: Category;
}

export interface IGetTeacherCategoryResponse extends IResponse {
  category: Category[];
}

export interface IAddOrUpdateStudentResponse extends IResponse {
  student: Student;
}
