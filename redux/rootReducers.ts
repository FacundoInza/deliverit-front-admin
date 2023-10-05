import { combineReducers } from 'redux';

import deliveriesReducer from './features/deliveries/deliveriesSlice';
import workersReducer from './features/workers/workersSlice';
import userReducer from './features/user/userSlice';
import dailyMetricsReducer from './features/daily-metrics/dailyMetricsSlice';
import filteredDateReducer from './features/filtered-date/filteredDateSlice';
import ordersReducer from './features/orders/ordersSlice';

const rootReducer = combineReducers({
    filteredDate: filteredDateReducer,
    deliveries: deliveriesReducer,
    workers: workersReducer,
    user: userReducer,
    dailyMetrics: dailyMetricsReducer,
    orders: ordersReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
