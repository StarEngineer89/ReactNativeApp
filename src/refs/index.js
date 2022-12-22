import { createRef } from 'react';

export const navigationRef = createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const navigateBack = () => {
  navigationRef.current?.goBack();
};

export const navigateBackWithParams = (props = {}) => {
  navigationRef.current?.setParams(props);
  navigationRef.current?.goBack();
};
