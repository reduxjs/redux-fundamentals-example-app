const createStore = (reducer, state) => {
  const listeners = [];
  const getState = () => {
    return state;
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    const unsubscribe = () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };

    return unsubscribe;
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  dispatch({ type: "" });

  return { dispatch, subscribe, getState };
};

export default createStore;
