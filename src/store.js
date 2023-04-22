import createStore from "./miniRedux";
import rootReducer from "./reducer";

const store = createStore(rootReducer);

export default store;
