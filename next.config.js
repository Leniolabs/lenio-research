module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://research-vaccines-lambda.s3.amazonaws.com/data/:path*" // Proxy to Backend
  //     }
  //   ];
  // },
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/vaccinations/index": { page: "/vaccinations" },
      "/space-flight/index": { page: "/space-flight" },
      "/map-vis/index": { page: "/map-vis" },
      "/timeline/index": { page: "/timeline" },
      "/women-in-tech/index": { page: "/women-in-tech" },
      "/olympics/index": { page: "/olympics" }
    };
  }
};
