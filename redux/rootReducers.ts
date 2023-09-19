import { combineReducers } from 'redux';

import deliveriesReducer from './features/deliveries/deliveriesSlice';
import workersReducer from './features/workers/workersSlice';
import userReducer from './features/user/userSlice';
import dailyMetricsReducer from './features/daily-metrics/dailyMetricsSlice';
import filteredDateReducer from './features/filtered-date/filteredDateSlice';

const rootReducer = combineReducers({
    filteredDate: filteredDateReducer,
    deliveries: deliveriesReducer,
    workers: workersReducer,
    user: userReducer,
    dailyMetrics: dailyMetricsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
