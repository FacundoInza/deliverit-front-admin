export default {
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.DELIVERIT_API_BASE_URL || 'http://deliverit.tech',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'mysecrettoken',
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
};
