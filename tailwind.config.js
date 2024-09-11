/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",

    ],
    theme: {
        extend: {
            colors: {
                'primary': "#38ACB1",
                'slate': {
                    100: '#f3f3f3'
                }
            },
            fontFamily: {
                'marai': ['Almarai', 'sans-serif'],
                'su': ['Suisse', 'sans-serif'],
            },
            minHeight: {
                'input': '56px'
            }

        }
    },
    plugins: [],
}