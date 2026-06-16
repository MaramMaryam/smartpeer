// const config = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };

// export default config;
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // @tailwindcss/postcss": {},
  },
};

export default config;
