import { combineReducers } from 'redux';

import deliveriesReducer from './features/deliveries/deliveriesSlice';
import workersReducer from './features/workers/workersSlice';
import userReducer from './features/user/userSlice';
import dealersReducer from './features/dealers/dealersSlice';
import dailyMetricsReducer from './features/daily-metrics/dailyMetricsSlice';
import { adminApi } from './services/adminApi';

const rootReducer = combineReducers({
    dealers: dealersReducer,
    deliveries: deliveriesReducer,
    workers: workersReducer,
    user: userReducer,
    dailyMetrics: dailyMetricsReducer,
    [adminApi.reducerPath]: adminApi.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
