// @ts-nocheck
import React, { PropsWithChildren, useReducer } from 'react';

/**
 * State refers to the state interface as used with initial state or default state when calling createDataContext
 * Actions refers to the state interface or type in which the combination for action type and payload is defined
 * DispatchableActions refers to the object of actions names with the action functions themselves
 * Reducer is the reducer function
 */
export default <IContext,>(reducer: any, actions: any, initialState: any) => {
  const Context = React.createContext<IContext>({
    state: initialState,
  });

  const Provider = ({ children }: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
