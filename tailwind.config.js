/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },

        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },

        extend: {
            colors: {
                primary: '#22577A', //Purple Color
                secondary: '#80ED99', //Green Color
                info: '#C7F9CC', //Light Yellow color
                delivered: '#C7F9CC',
                inProgress: '#F8E169',
                pending: '#96C9EB',
            },

            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            borderRadius: {
                'custom-10': '10px', // Radio de esquinas personalizado
                'custom-5': '5px', // Radio de esquinas personalizado
            },
            borderWidth: {
                0.5: '0.5px', // Ancho de borde personalizado
            },
            outline: {
                none: '0',
            },
        },
        variants: {
            extend: {
                outline: ['focus'],
            },
        },
    },
    plugins: [],
};
