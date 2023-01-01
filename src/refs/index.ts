import { createNavigationContainerRef } from '@react-navigation/native';
import { IHomeDrawerNavigatorParamsList } from 'src/navigations/_types';

export const navigationRef = createNavigationContainerRef<IHomeDrawerNavigatorParamsList>();

export const navigate = (name: any, params: any) => {
  navigationRef.current?.navigate(name, params);
};

export const navigateBack = () => {
  navigationRef.current?.goBack();
};

export const navigateBackWithParams = <T>(props: T) => {
  navigationRef.current?.setParams(props);
  navigationRef.current?.goBack();
};
