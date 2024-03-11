// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


import './src/env.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' })
    return config
  },
};

export default nextConfig;