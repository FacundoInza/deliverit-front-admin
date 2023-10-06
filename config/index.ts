import DEVELOPMENT from './development';
import PRODUCTION from './production';

//const { NODE_ENV } = process.env;
//console.log('NODE_ENV', NODE_ENV);

const NODE_ENV = 'production';

let currentEnv = DEVELOPMENT;

if (NODE_ENV === 'production') {
    currentEnv = PRODUCTION;
}

export default currentEnv;
