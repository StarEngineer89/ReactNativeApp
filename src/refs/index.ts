import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

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
