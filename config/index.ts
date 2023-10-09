import DEVELOPMENT from './development';
import PRODUCTION from './production';

const { NODE_ENV } = process.env;
console.log('NODE_ENV', NODE_ENV);

let currentEnv = DEVELOPMENT;

console.log('currentEnv', currentEnv.NODE_ENV);

if (NODE_ENV === 'production') {
    currentEnv = PRODUCTION;
}

export default currentEnv;
