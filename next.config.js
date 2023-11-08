const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    eslint: {
      ignoreDuringBuilds: true,
    },
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: !JSON.parse(process.env.NEXT_PUBLIC_MINIO_USE_SSL) ? 'http' : 'https',
          hostname: process.env.NEXT_PUBLIC_MINIO_END_POINT,
        },
      ],
    },
    experimental: {
      serverActions: true,
    },
    compiler: {
      // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
      styledComponents: {
        displayName: isDev,
        ssr: true,
        fileName: isDev,
      },
    },
  };
};
