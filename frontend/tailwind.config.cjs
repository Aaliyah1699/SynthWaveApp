export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                tektur: ['Tektur', 'sans-serif', 'Display'],
                doodle: ['Rubik Doodle Shadow', 'sans-serif', 'Display'],
                glitch: ['Rubik Glitch ', 'sans-serif', 'Display'],
                fax: ['Rubik Broken Fax', 'sans-serif', 'Display'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['cmyk', 'synthwave', 'sunset', 'fantasy'],
    },
};
