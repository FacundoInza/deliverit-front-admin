import { combineReducers } from 'redux';

import packagesReducer from '../redux/features/packages/packagesSlice';
import dealersReducer from '../redux/features/dealers/dealersSlice';

const rootReducer = combineReducers({
    packages: packagesReducer,
    dealers: dealersReducer,
});

export default rootReducer;
