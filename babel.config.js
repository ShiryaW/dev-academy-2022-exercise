module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Edge versions",
          ],
        },
      },
    ],
    "@babel/preset-react",
  ],
};
