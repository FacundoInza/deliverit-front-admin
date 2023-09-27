const path = require('path');

module.exports = {
    images: {
        domains: [
            'localhost',
            'cdn-icons-png.flaticon.com',
            'deliverit-profile-images.s3.sa-east-1.amazonaws.com',
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		return config;
	},
};
