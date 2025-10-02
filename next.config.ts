/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export if needed
  // output: 'export',

  // Configure headers for Teams
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://teams.microsoft.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
