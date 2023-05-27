module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  overrides: [
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
