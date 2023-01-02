import { NavigatorScreenParams } from '@react-navigation/native';
import { AUTH, CONTACT_US, DRAWER, PROFILE, SETS, STUDENT, STUDENTS, TABS, TEACHER } from 'src/constants/routes';
import { StudentCategory } from 'src/entities';

export type IAuthStackNavigatorParamsList = {
  [AUTH.GETTING_STARTED]: undefined;
  [AUTH.LOGIN]: undefined;
  [AUTH.RESET]: undefined;
  [AUTH.SIGNUP]: undefined;
  [AUTH.SWITCH_USERS]: undefined;
  [AUTH.WELCOME]: undefined;
};

export type IHomeTabNavigatorParamsList = {
  [TABS.CLASSROOM]: undefined;
  [TABS.NOTIFICATION]: undefined;
};

export type ISetStackNavigatorParamsList = {
  [SETS.MANAGE]: undefined;
  [SETS.MANAGE_CUSTOMS]: undefined;
  [SETS.EDIT]: {
    id: string;
  };
  [SETS.EDIT_DETAILS]: {
    subCategoryIndex: number;
    predefined: boolean;
  };
  [SETS.DETAILS]?: {
    title?: string;
    id?: string;
    itemIndex?: number;
    predefined?: boolean;
    length?: number;
  };
};

export type IStudentStackNavigatorParamsList = {
  [STUDENTS.EDIT]: {
    id: string;
    sets?: StudentCategory[];
  };
  [STUDENTS.MANAGE]: undefined;
  [STUDENTS.SELECT_SETS]?: {
    items: any[];
    id: string;
    parent: any;
  };
  [STUDENTS.CLASS_SETS]: {
    title: string;
    studentId: string;
  };
  [STUDENTS.CLASS_SET_ITEMS]: {
    title: string;
    studentId: string;
    classroomId: string;
    catId: string;
    predefined: boolean;
  };
  [STUDENTS.CAMERA]: undefined;
};

export type IHomeStackNavigatorParamsList = {
  [TEACHER.MAIN]: NavigatorScreenParams<IHomeTabNavigatorParamsList>;
  [STUDENTS.MAIN]: NavigatorScreenParams<IStudentStackNavigatorParamsList>;
  [SETS.MAIN]: NavigatorScreenParams<ISetStackNavigatorParamsList>;
};

export type IStudentMainStackNavigatorParamsList = {
  [STUDENT.DASHBOARD]: undefined;
  [STUDENT.CLASS_SET]: {
    title: string;
    cid: string;
    catId: string;
    predefined: boolean;
  };
};

export type IContactUsStackNavigatorParamsList = {
  [CONTACT_US.MAIN]: undefined;
};

export type IHomeDrawerNavigatorParamsList = {
  [DRAWER.HOME]: NavigatorScreenParams<IHomeStackNavigatorParamsList>;
  [DRAWER.EDIT]: NavigatorScreenParams<IProfileStackNavigatorParamsList>;
  [DRAWER.CONTACT_US]: NavigatorScreenParams<IContactUsStackNavigatorParamsList>;
  [DRAWER.PUPIL]: NavigatorScreenParams<IStudentMainStackNavigatorParamsList>;
};

export type IProfileStackNavigatorParamsList = {
  [PROFILE.MAIN]: undefined;
  [PROFILE.CHANGE_PASSWORD]: undefined;
};
