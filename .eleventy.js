const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 700],
    formats: ["avif", "jpeg"],
    urlPath: "/images/projects/",
    outputDir: "./public/images/projects/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  // console.log(metadata);

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images/");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksAsyncShortcode("11tyImage", imageShortcode);

  eleventyConfig.addCollection(
    "projectsByDifficulty",
    function (collectionApi) {
      return collectionApi.getFilteredByGlob("**/*.md").sort(function (a, b) {
        return b.data.difficultyNumber - a.data.difficultyNumber;
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
