module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images/");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection(
    "projectsByDifficulty",
    function (collectionApi) {
      return collectionApi.getFilteredByGlob("**/*.md").sort(function (a, b) {
        return b.data.difficulty - a.data.difficulty;
      });
    }
  );

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
