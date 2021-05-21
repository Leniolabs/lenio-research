module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/vaccinations/index.html": { page: "/vaccinations" },
      "/space-flight/index.html": { page: "/space-flight" },
      "/map-vis/index.html": { page: "/map-vis" },
      "/music/index.html": { page: "/music" }
    };
  }
};
