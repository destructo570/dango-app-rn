import React, { useReducer, FC, PropsWithChildren } from "react";

interface BoundActions {
  [key: string]: Function;
}

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);

  const Provider: FC<PropsWithChildren> = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: BoundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {props?.children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
