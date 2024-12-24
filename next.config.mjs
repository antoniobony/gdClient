/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/connexion',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
