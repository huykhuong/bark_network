module.exports = {
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "../**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "./**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "*",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "import"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      files: ["./app/javascript/**/*.{js,ts,tsx}"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
