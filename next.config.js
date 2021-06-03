module.exports = {
  async rewrites() {
    return [
      {
        source: "/vaccinesAPI/:path*",
        destination: "https://research-vaccines-lambda.s3.amazonaws.com/data/:path*" // Proxy to Backend
      }
    ];
  },
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/vaccinations/index.html": { page: "/vaccinations" },
      "/space-flight/index.html": { page: "/space-flight" },
      "/map-vis/index.html": { page: "/map-vis" }
    };
  }
};
