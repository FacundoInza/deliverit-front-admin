export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DELIVERIT_API_BASE_URL: 'http://localhost:5000',
    BASE_URL: 'http://localhost:5000',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'mysecrettoken',
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
};
