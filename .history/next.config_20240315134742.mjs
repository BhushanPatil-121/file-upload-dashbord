/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'your-domain.com',
              port: '',
              pathname: '/your-account/**',
            },
          ],

    },
};

export default nextConfig;
